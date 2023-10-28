import loginService from '../services/loginService';
import { NextFunction, Request, Response } from 'express'

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    let token = req.get('token') || '';
    try {
        loginService.verifyJWT(token)
        return next();
    } catch (error) {
        return res.status(401).json('Error: Incorrect Token')
    }
}
