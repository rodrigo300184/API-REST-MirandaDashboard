import { Request, Response, Router } from 'express';
import { usersService } from '../services/usersService';


const usersController = Router();

usersController.get('/', async (_req: Request, res: Response) => {
    try {
        const usersData = await usersService.get();
        res.status(200).send(usersData);
    } catch (error) {
        res.status(444).json(`${error}`);
    };
})

usersController.get('/:id', async (req: Request, res: Response) => {
    try {
        const response = await usersService.getById(req.params.id);
        res.status(200).send(response)
    } catch (error) {
        res.status(444).json(`${error}`);
    }
})

usersController.post('/', async (req: Request, res: Response) => {
    try {
        const response = await usersService.post(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

usersController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await usersService.delete(req.params.id)
        res.status(200).send('The user was correctly deleted.')
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

usersController.put('/:id', async (req: Request, res: Response) => {
    try {
        const response = await usersService.put(req.params.id, req.body)
        res.status(200).send(response)
    } catch (error) {
        res.status(444).send('No response from server');
    }
})

export default usersController;