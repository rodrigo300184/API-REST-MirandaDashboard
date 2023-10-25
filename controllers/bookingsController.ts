
import bookingsData from '../assets/data/bookingsData.json';
import { Request, Response, Router } from 'express';
import { BookingInterface } from '../models/bookingModel';


const bookingsController = Router();

bookingsController.get('/', (req: Request, res: Response) => {
    try {
        res.send(bookingsData)
    } catch (error) {
        res.status(444).send('No response from server');
    };
})


bookingsController.get('/:id', (req: Request, res: Response) => {
    try {
        const response = bookingsData.filter((element) => { return element.id === req.params.id })
        res.send(response)
    } catch (error) {
        res.status(444).send('No response from server');
    }
})

bookingsController.post('/', (req: Request<BookingInterface>, res: Response<any>) => {
    try {
        bookingsData.push(req.body);
        res.send(bookingsData);
    } catch (error) {
        res.status(444).send('No response from server');
    }
})

bookingsController.delete('/:id', (req: Request, res: Response) => {
    try {
        const index = bookingsData.findIndex((element) => element.id === req.params.id)
        bookingsData.splice(index, 1)
        res.send(bookingsData)
        res.status(200).send('The booking was correctly deleted.')
    } catch (error) {
        res.status(444).send('No response from server');
    }
})

bookingsController.put('/:id', (req: Request<BookingInterface>, res: Response) => {
    try {
        const newData = req.body;
        const index = bookingsData.findIndex((element) => element.id === req.params.id)
        bookingsData[index] = { ...bookingsData[index], ...newData };
        res.send(bookingsData)
    } catch (error) {
        res.status(444).send('No response from server');
    }
})

export default bookingsController;