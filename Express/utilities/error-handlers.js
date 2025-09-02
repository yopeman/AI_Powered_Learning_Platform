import fs from 'fs/promises';

function handler(req, res, next) {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
}

function error_handler(err, req, res, next) {
    console.error(err, err.response);
    fs.writeFile('error.log', `${new Date().toISOString()} - ${err.message} - ${err.stack}\n\n`, { flag: 'a' });

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        status: err.status || 500,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
        success: false,
    });
}

const createError = (status, message) => {
    if (typeof message === 'string') {
        const error = new Error(message);
        error.status = status;
        return error;
    } else {
        message.status = status;
        return message;
    }
};

export {
    handler,
    error_handler,
    createError
};