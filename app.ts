import express, {Express } from 'express';
import  {loginController}  from './controllers/loginController';
import  bookingsController  from './controllers/bookingsController';

//import cors from 'cors';

export const app: Express = express();

// middlewares
//app.use(cors())
app.use(express.json())

// public routes

app.use('/login', loginController)
app.use('/bookings', bookingsController)

