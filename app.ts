import express, { Express, Request, Response } from 'express';
import { loginController } from './controllers/loginController';
import { roomsController } from './controllers/roomsController';
import { bookingsController } from './controllers/bookingsController';
import { usersController } from './controllers/usersController';
import { authMiddleware } from './middlewares/login';
import { infoController } from './controllers/infoController';
import { contactController } from './controllers/contactController';
import cors from 'cors';
import mongoose from 'mongoose';
import { ScriptSeed } from './assets/data/seed';
import { Bookings } from './models/bookingsModel';

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017', {
            dbName: 'Miranda_API',
        })
        console.log('Conectado a Mongo')
    } catch (error) {
        console.log(error);
     }
})()

ScriptSeed();

export const app: Express = express();

// middlewares
app.use(cors())
app.use(express.json())

// public routes
app.use('/', infoController)
app.use('/login', loginController)
app.use(authMiddleware)
app.use('/bookings', bookingsController)
app.use('/rooms', roomsController)
app.use('/users', usersController)
app.use('/contacts', contactController)
app.use((error: Error, _req: Request, res: Response) => {
    console.error(error);
    return res.status(500).json({ error: true, message: 'Application error' })
})