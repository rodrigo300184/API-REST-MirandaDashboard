import { Request, Response, Router } from 'express';
import { roomsService } from '../services/roomsService';


const roomsController = Router();

roomsController.get('/', async (_req: Request, res: Response) => {
    try {
        const roomsData = await roomsService.get();
        res.status(200).send(roomsData);
    } catch (error) {
        res.status(444).json(`${error}`);
    };
})

roomsController.get('/:id', async (req: Request, res: Response) => {
    try {
        const response = await roomsService.getById(req.params.id);
        res.status(200).send(response)
    } catch (error) {
        res.status(444).json(`${error}`);
    }
})

roomsController.post('/', async (req: Request, res: Response) => {
    try {
        const response = await roomsService.post(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

roomsController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await roomsService.delete(req.params.id)
        res.status(200).send('The room was correctly deleted.')
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

roomsController.put('/:id', async (req: Request, res: Response) => {
    try {
        const response = await roomsService.put(req.params.id, req.body)
        res.status(200).send(response)
    } catch (error) {
        res.status(444).send('No response from server');
    }
})

export default roomsController;