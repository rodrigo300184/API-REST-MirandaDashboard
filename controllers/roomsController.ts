import { Request, Response, Router } from 'express';
import { roomsService } from '../services/roomsService';


export const roomsController = Router();

roomsController.get('/', async (_req: Request, res: Response) => {
    try {
        const roomsData = await roomsService.fetchAll();
        res.json({roomsData});
    } catch (error) {
        res.status(500).json(`${error}`);
    };
})

roomsController.get('/:id', async (req: Request, res: Response) => {
    try {
        const room = await roomsService.fetchOne(req.params.id);
        res.json({room})
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

roomsController.post('/', async (req: Request, res: Response) => {
    try {
        const newRoom = await roomsService.createOne(req.body);
        res.json({newRoom});
    } catch (error) {
        res.status(500).send(error);
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
        const updatedRoom = await roomsService.editOne(req.params.id, req.body)
        res.json({updatedRoom})
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

