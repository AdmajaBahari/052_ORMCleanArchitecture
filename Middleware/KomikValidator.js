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


function validateBody(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            convert: true,
            allowUnknown: false
        });

        if (error) {
            return errorResponse(
                res,
                'Validation input gagal',
                400,
                error.details.map(item => ({
                    field: item.path.join('.'),
                    message: item.message
                }))
            );
        }
        req.body = value;
        next();
    };
}


function validateParams(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);

        if (error) {
            return errorResponse(
                res,
                'Validation tidak valid',
                400,
                error.details.map(item => ({
                    field: item.path.join('.'),
                    message: item.message,
                }))
            );
        }
        req.params = value;
        next();
    };
}
