import { NextFunction, Request, Response, Router } from 'express';
import { BookingInterface } from '../interfaces/bookingsInterface';
import { bookingService } from '../services/bookingService';



export const bookingsController = Router();

bookingsController.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingsData = await bookingService.fetchAll();
        res.json({bookingsData});
    } catch (error) {
        next(error);
    };
})

bookingsController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await bookingService.fetchOne(req.params.id);
        res.json({booking})
    } catch (error) {
        next(error);
    }
})

bookingsController.post('/', async (req: Request<BookingInterface>, res: Response<any>, next: NextFunction) => {
    try {
        const newBooking = await bookingService.createOne(req.body);
        res.json({newBooking});
    } catch (error) {
        next(error);
    }
})

bookingsController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await bookingService.deleteOne(req.params.id)
        res.json('The booking was correctly deleted.')
    } catch (error) {
        next(error);
    }
})

bookingsController.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedBooking = await bookingService.editOne(req.params.id || '', req.body)
        res.json({updatedBooking})
    } catch (error) {
        next(error);
    }
})

 