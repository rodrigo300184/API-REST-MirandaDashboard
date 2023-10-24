
import {Request, Response, Router} from 'express';

export const loginController = Router();

loginController.get('/', (req:Request, res:Response) => {
    res.send('Hola Login!')
})

