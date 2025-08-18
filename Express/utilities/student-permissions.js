import { Payments, Subscriptions, Users } from "../models/index.js";
import { Op } from "sequelize";
import { find_topics } from "./finds.js";

export default async function hasStudentPermission(userId, topicId) {
    try {
        const topicInfo = await find_topics(topicId);
        const subscription = await Subscriptions.findOne({
            where: {
                [Op.and]: [
                    { userId },
                    { fieldId: topicInfo.fields.id }
                ]
            }
        });

        if (!subscription) {
            return 'No subscription found for this topic.';
        }

        const payment = await Payments.findOne({
            where: {
                [Op.and]: [
                    { subscriptionId: subscription.id },
                    { year: topicInfo.courses.year },
                    { semester: topicInfo.courses.semester }
                ]
            }
        });

        // Check if the topic is free
        if (topicInfo.fields.isFree) {
            return true;
        }

        // Check if free topics are exhausted
        if (topicInfo.fields.number_of_free_topics >= subscription.learned_topic_numbers) {
            return true;
        }

        // Check for payment requirement
        if (!payment) {
            return 'Payment is required for this year and semester.';
        }

        return true;
    } catch (error) {
        console.error(`Error checking permissions: ${error.message}`);
        return 'An error occurred while checking permissions.';
    }
}