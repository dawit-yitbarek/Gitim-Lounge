import rateLimit from 'express-rate-limit';

export const forgotPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many requests to forgot password, please try again later.",
        });
    },
});

export const registrationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many registration requests, please try again later.",
        });
    },
});

export const sendMessageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many messages sent, please use another way to contact us or try again later.",
        });
    },
});
