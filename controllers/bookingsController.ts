import { NextFunction, Request, Response, Router } from 'express';
import { bookingService } from '../services/bookingService';
import { generateValidationMiddleware } from '../validator/validationMiddleware';
import { bookingSchema } from '../validator/validationSchemas';



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

bookingsController.post('/', generateValidationMiddleware(bookingSchema), async (req: Request, res: Response, next: NextFunction) => {
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

bookingsController.put('/:id',generateValidationMiddleware(bookingSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedBooking = await bookingService.editOne(req.params.id || '', req.body)
        res.json({updatedBooking})
    } catch (error) {
        next(error);
    }
})

 