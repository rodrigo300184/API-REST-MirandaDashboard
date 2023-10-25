import express, {Express } from 'express';
import  loginController  from './controllers/login';
import  bookingsController  from './controllers/booking';
//import cors from 'cors';

export const app: Express = express();

// middlewares
//app.use(cors())
app.use(express.json())

// public routes
app.use('/login', loginController)
app.use('/bookings', bookingsController)

