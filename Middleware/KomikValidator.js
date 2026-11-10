const Joi = require('joi');

const errorResponse = (res, message, status, details = null) => {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details
    });
}

const komikSchema = Joi.object({
    title: Joi.string().trim().min(1).max(255).required(),
    description: Joi.string().trim().allow(null,'').optional(),
    author: Joi.string().trim().min(1).max(100).required(),
});

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});