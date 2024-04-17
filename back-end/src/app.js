import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from 'cors'
import dotenv from 'dotenv'

import indexRouter from "./routes/index.js";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

const app = express();

app.use(cors({
  origin: process.env.FRONT_END_URL.split(','),
  credentials: true
}))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

/************************************************
 * ROTAS DA API
************************************************/
import auth from './middleware/auth.js'
app.use(auth)

import carRoute from './routes/car.js'
app.use('/cars', carRoute)

import usersRoute from './routes/users.js'
app.use('/users', usersRoute)

import customerRoute from './routes/customer.js'
app.use('/customers', customerRoute)

import sellerRoute from './routes/seller.js'
app.use('/sellers', sellerRoute)

export default app;
