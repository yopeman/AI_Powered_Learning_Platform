import axios from 'axios';
import { uuidv1 } from '../models/config.js';
import { Users, Payments, Fields, Subscriptions, Amounts } from '../models/index.js';
import { Op } from 'sequelize';
import { createError } from '../utilities/error-handlers.js';

async function payment_create(req, res, next) {
    const { fieldId, year, semester } = req.body;

    // Validate input
    if (!fieldId || !year || !semester) {
        return next(createError(400, 'Payment details are required.'));
    }

    try {
        const field = await Fields.findByPk(fieldId);
        if (!field) {
            return next(createError(404, 'Field not found.'));
        }

        const subscription = await Subscriptions.findOne({
            where: { 
                [Op.and]: [
                    { userId: req.user.id },
                    { fieldId }
                ]
             }
        });
        
        if (!subscription) {
            return next(createError(404, 'Subscription not found'));
        }

        if (field.isFree) {
            return next(createError(400, 'Field is free, no payment required.'));
        }

        const amount = await Amounts.findOne();
        if (!amount) {
            return next(createError(404, 'No payment amount found.'));
        }

        const oldPayment = await Payments.findOne({
            where: {
                [Op.and]: [
                    { subscriptionId: subscription.id },
                    { year },
                    { semester },
                    { status: 'completed' }
                ]
            }
        });
        if (oldPayment) {
            return next(createError(400, 'For this year and semester alrady payed.'));
        }

        const paymentId = uuidv1();
        const user = await Users.findByPk(req.user.id);

        const paymentInit = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
            amount: amount.amount,
            currency: 'ETB',
            // email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            // phone_number: user.phone,
            tx_ref: paymentId,
            callback_url: `${process.env.DOMAIN}/payments/webhook`,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHAPA_SECRET}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(paymentInit.data);
        

        if (paymentInit.data.status !== 'success') {
            return next(createError(500, 'Payment initialization failed.'));
        }

        const newPayment = await Payments.create({
            id: paymentId,
            subscriptionId: subscription.id,
            amount: amount.amount,
            checkout_url: paymentInit.data.data.checkout_url,
            year,
            semester
        });

        res.status(201).json({
            message: 'Payment initialized successfully.',
            data: newPayment,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function payment_webhook(req, res, next) {
    const { status, trx_ref } = req.query;

    if (!trx_ref) {
        return next(createError(400, 'Transaction reference is required.'));
    }

    try {
        const payment = await Payments.findByPk(trx_ref);
        if (!payment) {
            return next(createError(404, 'Payment not found.'));
        }

        if (status === 'success') {
            const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${trx_ref}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.CHAPA_SECRET}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 'success') {
                payment.receipt_url = `https://checkout.chapa.co/checkout/test-payment-receipt/${response.data.data.reference}`;
                payment.status = 'completed';
                payment.transactionId = response.data.data.reference;
                payment.method = response.data.data.method;
            } else {
                payment.status = 'failed';
            }
        } else {
            payment.status = 'failed';
        }

        await payment.save();
        res.status(200).json();
    } catch (err) {
        return next(err);
    }
}

async function payment_get_by_id(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'Payment ID is required.'));
    }

    try {
        const payment = await Payments.findByPk(id);
        if (!payment) {
            return next(createError(404, 'Payment not found.'));
        }

        res.status(200).json({
            message: 'Payment fetched successfully.',
            data: payment,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

export {
    payment_create,
    payment_webhook,
    payment_get_by_id
}