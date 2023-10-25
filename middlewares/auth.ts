import authService from '../services/login'
import { NextFunction, Request, Response } from 'express'

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    let headerVal = req.get('Authorization');
    if(!headerVal)
      return res.status(401).json({error:true, message:})
}

