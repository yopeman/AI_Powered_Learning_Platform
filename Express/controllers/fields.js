import { Op } from 'sequelize';
import { Courses, Fields, Subscriptions, Users } from '../models/index.js';
import { createError } from '../utilities/error-handlers.js';

async function field_get(req, res, next) {
    try {
        const whereClose = {};

        // Adjust query based on user role
        if (req.user.role === 'student') {
            whereClose.status = 'active';

            const subscriptions = await Subscriptions.findAll({ where: { userId: req.user.id } });
            const fieldIds = subscriptions.map(s => s.fieldId);
            console.log(fieldIds);
            whereClose.id = { [Op.notIn]: fieldIds }
        }

        const allFields = await Fields.findAll({ where: whereClose });

        if (allFields.length === 0) {
            return next(createError(404, 'No fields found.'));
        }

        res.status(200).json({
            message: 'Fields fetched successfully.',
            success: true,
            data: allFields
        });
    } catch (err) {
        return next(err);
    }
}

async function field_get_by_id(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Field ID is required.'));
    }

    try {
        const field = await Fields.findByPk(id);
        if (!field) {
            return next(createError(404, 'Field not found.'));
        }

        res.status(200).json({
            message: 'Field fetched successfully.',
            success: true,
            data: field
        });
    } catch (err) {
        return next(err);
    }
}

async function field_create(req, res, next) {
    const { title, description, years_length, isFree, number_of_free_topics, status } = req.body;

    if (!title || !years_length || !number_of_free_topics) {
        return next(createError(400, 'All required fields must be fulfilled.'));
    }

    try {
        const new_field = await Fields.create({
            title,
            description,
            years_length,
            isFree,
            number_of_free_topics,
            status
        });

        res.status(201).json({
            message: 'Field created successfully.',
            success: true,
            data: new_field
        });
    } catch (err) {
        return next(err);
    }
}

async function field_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Field ID must be provided.'));
    }

    try {
        const [updated] = await Fields.update(req.body, { where: { id } });
        if (!updated) {
            return next(createError(404, 'Field not found or not updated.'));
        }

        res.status(200).json({
            message: 'Field updated successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function field_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Field ID must be provided.'));
    }

    try {
        const delete_count = await Fields.destroy({ where: { id } });
        if (!delete_count) {
            return next(createError(404, 'Field not found or not deleted.'));
        }

        res.status(200).json({
            message: 'Field deleted successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function field_course(req, res, next) {
    const { fieldId } = req.params;
    if (!fieldId) {
        return next(createError(400, 'Field ID is required.'));
    }

    try {
        const courses = await Courses.findAll({ where: { fieldId } });
        if (!courses.length) {
            return next(createError(404, 'No courses available for this field.'));
        }

        res.status(200).json({
            message: 'Courses fetched successfully.',
            data: courses,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function field_subscriptions(req, res, next) {
    const { fieldId } = req.params;
    if (!fieldId) {
        return next(createError(400, 'Field ID are required.'));
    }

    try {
        const field = await Fields.findByPk(fieldId);
        if (!field) {
            return next(createError(404, 'Field not found.'));
        }
        
        const subscriptions = await Subscriptions.findAll({ where: { fieldId } });
        const users = await Promise.all(subscriptions.map(async  sub => await Users.findByPk(sub.userId)));

        if (!subscriptions.length) {
            return next(createError(404, 'No subscription found.'));
        }

        res.status(200).json({
            message: 'Subscriptions fetched successfully.',
            success: true,
            data: { subscriptions, users, field }
        });
    } catch (err) {
        return next(err);
    }
}

export {
    field_get,
    field_get_by_id,
    field_create,
    field_update,
    field_delete,
    field_course,
    field_subscriptions
}