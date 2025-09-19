import { Chapters, Courses } from '../models/index.js';
import { hasAssistantCoursePermission, hasAssistantFieldPermission } from '../utilities/assistant-permissions.js';
import { createError } from '../utilities/error-handlers.js';

async function course_get(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Course ID is required.'));
    }

    try {
        const course = await Courses.findByPk(id);
        if (!course) {
            return next(createError(404, 'Course not found.'));
        }

        res.status(200).json({
            message: 'Course fetched successfully.',
            data: course,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function course_chapter(req, res, next) {
    const { courseId } = req.params;
    
    if (!courseId) {
        return next(createError(400, 'Course ID is required.'));
    }

    try {
        const chapters = await Chapters.findAll({ where: { courseId }, order: [['createdAt', 'ASC']]  });

        if (!chapters.length) {
            return next(createError(404, 'No chapters found for this course.'));
        }

        res.status(200).json({
            message: 'Course chapters fetched successfully.',
            data: chapters,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function course_create(req, res, next) {
    const { title, description, fieldId, year, semester, chapters_length } = req.body;

    if (!title || !fieldId || !year || !semester || !chapters_length) {
        return next(createError(400, 'All fields are required.'));
    }

    const permissionMsg = await hasAssistantFieldPermission(req.user.id, fieldId);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const new_course = await Courses.create({
            title,
            description,
            fieldId,
            year,
            semester,
            chapters_length
        });

        res.status(201).json({
            message: 'Course created successfully.',
            data: new_course,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function course_update(req, res, next) {
    const { id } = req.params;
    
    if (!id) {
        return next(createError(400, 'Course ID is required.'));
    }

    const permissionMsg = await hasAssistantCoursePermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const [updated] = await Courses.update(req.body, { where: { id } });

        if (!updated) {
            return next(createError(404, 'Course not found or not updated.'));
        }

        res.status(200).json({
            message: 'Course updated successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function course_delete(req, res, next) {
    const { id } = req.params;
    
    if (!id) {
        return next(createError(400, 'Course ID is required.'));
    }

    const permissionMsg = await hasAssistantCoursePermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const deleted_course = await Courses.destroy({ where: { id } });

        if (!deleted_course) {
            return next(createError(404, 'Course not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Course deleted successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

export {
    course_get,
    course_chapter,
    course_create,
    course_update,
    course_delete
}