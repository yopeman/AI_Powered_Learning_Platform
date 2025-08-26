import { FileContents, Interactions, Subscriptions, Topics } from '../models/index.js';
import { generateContent_By_OpenAI, generateContent_By_GoogleGenAI } from '../utilities/ai-service.js';
import { generateAnswer_By_OpenAI, generateAnswer_By_GoogleGenAI } from '../utilities/ai-service.js';
import { find_topics } from '../utilities/finds.js';
import hasStudentPermission from '../utilities/student-permissions.js';
import { hasAssistantChapterPermission, hasAssistantTopicPermission } from '../utilities/assistant-permissions.js';
import { createError } from '../utilities/error-handlers.js';

async function topic_get_by_id(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasAssistantTopicPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const topic = await Topics.findByPk(id);
        if (!topic) {
            return next(createError(404, 'Topic not found.'));
        }

        res.status(200).json({
            message: 'Topic fetched successfully.',
            data: topic,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function topic_create(req, res, next) {
    const { chapterId, titles } = req.body;

    if (!chapterId || !titles || !Array.isArray(titles) || titles.length === 0) {
        return next(createError(400, 'Chapter ID and titles are required.'));
    }

    const permissionMsg = await hasAssistantChapterPermission(req.user.id, chapterId);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const topicPromises = titles.map(title => {
            if (!title) {
                return Promise.reject(createError(400, 'All titles are required.'));
            }
            return Topics.create({
                chapterId, 
                title 
            });
        });

        await Promise.all(topicPromises);

        res.status(201).json({
            message: 'Topics created successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function topic_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasAssistantTopicPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        req.body.content_file_path = null;
        const [updated] = await Topics.update(req.body, { where: { id } });

        if (!updated) {
            return next(createError(404, 'Topic not found or not updated.'));
        }

        res.status(200).json({
            message: 'Topic updated successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function topic_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasAssistantTopicPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const deleted = await Topics.destroy({ where: { id } });

        if (!deleted) {
            return next(createError(404, 'Topic not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Topic deleted successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function topic_content(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasStudentPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(403, permissionMsg));
    }

    try {
        const topic = await Topics.findByPk(id);
        if (!topic) {
            return next(createError(404, 'Topic not found.'));
        }

        if (topic.content_file_path) {
            const contents = await FileContents.findByPk(topic.content_file_path);
            return res.status(200).json({
                message: 'Data fetched successfully.',
                data: contents.content,
                success: true,
            });
        }

        const topicDetail = await find_topics(id);
        const context = {
            field: topicDetail.fields.title,
            course: topicDetail.courses.title,
            year: topicDetail.courses.year,
            semester: topicDetail.courses.semester
        };

        const generatedContent = await generateContent(topicDetail.topics.title, context);
        const file = await FileContents.create({
            content: generatedContent,
            topic_id: topic.id
        });

        topic.content_file_path = file.id;
        await topic.save();

        const subscription = await Subscriptions.findOne({
            where: {
                userId: req.user.id,
                fieldId: topicDetail.fields.id
            }
        });

        if (subscription) {
            subscription.learned_topic_numbers += 1;
            await subscription.save();
        }

        res.status(200).json({
            message: 'Data generated successfully.',
            data: generatedContent,
            success: true,
        });
    } catch (err) {
        return next(createError(500, err.message || 'An error occurred while processing your request.'));
    }
}

async function topic_ask(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasStudentPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(403, permissionMsg));
    }

    const { question } = req.body;
    if (!question) {
        return next(createError(400, 'Question is required.'));
    }

    try {
        let interaction = await Interactions.findOne({
            where: {
                topicId: id,
                question,
            },
        }) || await Interactions.create({
            userId: req.user.id,
            topicId: id,
            question,
        });

        if (interaction.response_file_path) {
            const contents = await FileContents.findByPk(interaction.response_file_path);
            return res.status(200).json({
                message: 'Data fetched successfully.',
                data: contents.content,
                success: true,
            });
        }

        const topicDetail = await find_topics(id);
        const historyFile = await FileContents.findByPk(topicDetail.topics.content_file_path);
        const context = {
            question,
            history: historyFile.content,
        };

        const generatedAnswer = await generateAnswer(question, context);
        const file = await FileContents.create({
            content: generatedAnswer,
            interaction_id: interaction.id,
        });

        interaction.response_file_path = file.id;
        await interaction.save();

        res.status(200).json({
            message: 'Data generated successfully.',
            data: generatedAnswer,
            success: true,
        });
    } catch (err) {
        return next(createError(500, err.message || 'An error occurred while processing your request.'));
    }
}

async function topic_current_interactions(req, res, next) {
    const { topicId } = req.params;
    const userId = req.user.id;

    if (!topicId) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasStudentPermission(req.user.id, topicId);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {const interactions = await Interactions.findAll({
            where: {
                topicId,
                userId,
            },
        });

        if (!interactions.length) {
            return next(createError(404, 'No interactions found for this user and topic.'));
        }

        const fullInteractions = interactions.map(async (interaction) => {
            const responseData = await FileContents.findByPk(interaction.response_file_path); // Read file content
            return { ...interaction.toJSON(), response: responseData.content }; // Use toJSON() to get plain object
        });

        // Response without response_file_path
        res.status(200).json({
            message: 'Interactions fetched successfully.',
            data: fullInteractions,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function generateContent(topicTitle, context) {
    // return await generateContent_By_OpenAI(topicTitle, context);
    // return await generateContent_By_GoogleGenAI(topicTitle, context);
    return `# ${JSON.stringify(topicTitle)} => ${JSON.stringify(context)}`;
}

async function generateAnswer(question, history) {
    // return await generateAnswer_By_OpenAI(question, history);
    // return await generateAnswer_By_GoogleGenAI(question, history);
    return `# ${JSON.stringify(question)} => ${JSON.stringify(history)}`;
}

export {
    topic_get_by_id,
    topic_create,
    topic_update,
    topic_delete,
    topic_content,
    topic_ask,
    topic_current_interactions
}