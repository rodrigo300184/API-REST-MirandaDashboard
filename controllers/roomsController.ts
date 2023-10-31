import { Request, Response, Router } from 'express';
import { roomsService } from '../services/roomsService';


export const roomsController = Router();

roomsController.get('/', async (_req: Request, res: Response) => {
    try {
        const roomsData = await roomsService.fetchAll();
        res.json(roomsData);
    } catch (error) {
        res.status(500).json(`${error}`);
    };
})

roomsController.get('/:id', async (req: Request, res: Response) => {
    try {
        const response = await roomsService.fetchOne(req.params.id);
        res.json(response)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

roomsController.post('/', async (req: Request, res: Response) => {
    try {
        const response = await roomsService.createOne(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

roomsController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await roomsService.deleteOne(req.params.id)
        res.json('The room was correctly deleted.')
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

roomsController.put('/:id', async (req: Request, res: Response) => {
    try {
        const response = await roomsService.editOne(req.params.id, req.body)
        res.json(response)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

