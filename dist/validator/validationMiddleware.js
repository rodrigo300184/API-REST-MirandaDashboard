"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidationMiddleware = void 0;
function generateValidationMiddleware(schema) {
    const validationMiddleware = (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error)
            return res.status(400).json({ error: true, message: error.message });
        next();
    };
    return validationMiddleware;
}
exports.generateValidationMiddleware = generateValidationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map