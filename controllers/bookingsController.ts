import { Request, Response, Router } from 'express';
import { BookingInterface } from '../models/bookingModel';
import { bookingService } from '../services/bookingService';


const bookingsController = Router();

bookingsController.get('/', async (_req: Request, res: Response) => {
    try {
        const bookingsData = await bookingService.get();
        res.status(200).send(bookingsData);
    } catch (error) {
        res.status(444).json(`${error}`);
    };
})

bookingsController.get('/:id', async (req: Request, res: Response) => {
    try {
        const response = await bookingService.getById(req.params.id);
        res.status(200).send(response)
    } catch (error) {
        res.status(444).json(`${error}`);
    }
})

bookingsController.post('/', async (req: Request<BookingInterface>, res: Response<any>) => {
    try {
        const response = await bookingService.post(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

bookingsController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await bookingService.delete(req.params.id)
        res.status(200).send('The booking was correctly deleted.')
    } catch (error) {
        res.status(400).json(`${error}`);
    }
})

bookingsController.put('/:id', async (req: Request<BookingInterface>, res: Response) => {
    try {
        const response = await bookingService.put(req.params.id, req.body)
        res.status(200).send(response)
    } catch (error) {
        res.status(444).send('No response from server');
    }
})

export default bookingsController;