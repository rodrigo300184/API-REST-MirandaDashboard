import { Request, Response, Router } from 'express';
import { contactsService } from '../services/contactsService';


export const contactController = Router();

contactController.get('/', async (_req: Request, res: Response) => {
    try {
        const usersData = await contactsService.fetchAll();
        res.json(usersData);
    } catch (error) {
        res.status(500).json(`${error}`);
    };
})

contactController.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await contactsService.fetchOne(req.params.id);
        res.json(result)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

contactController.post('/', async (req: Request, res: Response) => {
    try {
        const result = await contactsService.createOne(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

contactController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await contactsService.deleteOne(req.params.id)
        res.json('The contact was correctly deleted.')
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

contactController.put('/:id', async (req: Request, res: Response) => {
    try {
        const result = await contactsService.editOne(req.params.id, req.body)
        res.json(result)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

