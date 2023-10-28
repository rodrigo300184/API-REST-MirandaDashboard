import { Request, Response, Router } from 'express';
import { BookingInterface } from '../models/bookingsModel';
import { bookingService } from '../services/bookingService';


export const bookingsController = Router();

bookingsController.get('/', async (_req: Request, res: Response) => {
    try {
        const bookingsData = await bookingService.get();
        res.json(bookingsData);
    } catch (error) {
        res.status(500).json(`${error}`);
    };
})

bookingsController.get('/:id', async (req: Request, res: Response) => {
    try {
        const response = await bookingService.getById(req.params.id);
        res.json(response)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

bookingsController.post('/', async (req: Request<BookingInterface>, res: Response<any>) => {
    try {
        const response = await bookingService.post(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

bookingsController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await bookingService.delete(req.params.id)
        res.json('The booking was correctly deleted.')
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

bookingsController.put('/:id', async (req: Request<BookingInterface>, res: Response) => {
    try {
        const response = await bookingService.put(req.params.id, req.body)
        res.json(response)
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

