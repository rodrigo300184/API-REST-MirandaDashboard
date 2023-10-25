import express, {Express } from 'express';
import  {loginController}  from './controllers/loginController';
import  bookingsController  from './controllers/bookingsController';
import authMiddleware from './middlewares/auth';

//import cors from 'cors';

export const app: Express = express();

// middlewares
//app.use(cors())
app.use(express.json())

// public routes

app.use('/login', loginController)
app.use(authMiddleware)
app.use('/bookings', bookingsController)

