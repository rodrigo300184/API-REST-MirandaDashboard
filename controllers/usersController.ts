import { Request, Response, Router } from 'express';
import { usersService } from '../services/usersService';
import { userSchema } from '../validator/validationSchemas';
import { generateValidationMiddleware } from '../validator/validationMiddleware';


export const usersController = Router();

usersController.get('/', async (_req: Request, res: Response) => {
    try {
        const usersData = await usersService.fetchAll();
        res.json(usersData);
    } catch (error) {
        res.status(500).json(`${error}`);
    };
})

usersController.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await usersService.fetchOne(req.params.id);
        res.json(result)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

usersController.post('/', generateValidationMiddleware(userSchema), async (req: Request, res: Response) => {
    try {
        const result = await usersService.createOne(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

usersController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await usersService.deleteOne(req.params.id)
        res.json('The user was correctly deleted.')
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

usersController.put('/:id', generateValidationMiddleware(userSchema), async (req: Request, res: Response) => {
    try {
        const result = await usersService.editOne(req.params.id, req.body)
        res.json(result)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

