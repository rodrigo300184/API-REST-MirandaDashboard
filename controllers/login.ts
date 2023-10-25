
import {Request, Response, Router} from 'express';

const loginController = Router();

loginController.get('/', (req:Request, res:Response) => {
    res.send('Hola Login!')
})

export default loginController;
