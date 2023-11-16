import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function generateValidationMiddleware(schema: Joi.ObjectSchema) {
    const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body,{abortEarly: false});
        if(error) 
            return res.status(400).json({error: true, message: error.message })
        next();
    }
    return validationMiddleware;
}