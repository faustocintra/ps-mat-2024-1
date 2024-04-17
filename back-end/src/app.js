import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import dotenv from 'dotenv';
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

import indexRouter from "./routes/index.js";
// import userRouter from "./routes/users.js"

const app = express();

import cors from 'cors'

app.use(cors({
    origin: process.env.FRONT_END_URL.split(','),
    credentials:true
}))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

/*************************************************************************
 *  ROTAS DA API
 ************************************************************************/

// Middleware que proteje as rotas com autenticação
import auth from './middleware/auth.js'
app.use(auth)

import carRoute from './routes/car.js'
app.use('/cars', carRoute)

import userRoute from './routes/user.js'
app.use('/users', userRoute)

import customerRoute from './routes/customer.js'
app.use('/customers', customerRoute)

import sellerRoute from './routes/seller.js'
app.use('/sellers', sellerRoute)

export default app;
