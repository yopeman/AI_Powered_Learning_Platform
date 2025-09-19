import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';
import { createError } from './error-handlers.js';

const SECRET_KEY = process.env.JWT_SECRET;

async function isAuth(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(createError(401, 'No Authorization Header'));
    }

    try {
        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return next(createError(401, 'Invalid Token Format'));
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        // console.log('Decoded JWT:', decoded);

        req.user = await Users.findByPk(decoded.id);
        // console.log('Current user:', req.user?.dataValues);
        next();
    } catch (error) {
        handleJwtError(error, next);
    }
}

function handleJwtError(error, next) {
    if (error instanceof jwt.TokenExpiredError) {
        return next(createError(401, `Session Expired. ${error.message}`));
    }
    if (error instanceof jwt.JsonWebTokenError) {
        return next(createError(401, `Invalid Token. ${error.message}`));
    }

    return next(createError(401, `Internal Server Error. ${error.message}`));
}

function hasRole(role) {
    return (req, res, next) => {
        if (!req.user) {
            return next(createError(401, `Unauthorized user`));
        }

        if (req.user.role !== role) {
            return next(createError(403, `You do not have ${role} privileges`));
        }

        next();
    };
}

const isAdmin = hasRole('admin');
const isStudent = hasRole('student');
const isAssistant = hasRole('assistant');

export default isAuth;
export { isAdmin, isStudent, isAssistant };