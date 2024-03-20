import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";

import dotenv from 'dotenv';
//carregar as variaveis de ambiente
dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(auth)

app.use("/", indexRouter);


import carRoute from './routes/car.js'
app.use('/cars', carRoute)

import customerRouter from './routes/customer.js'
app.use('/customer', customerRouter)

import userRoute from './routes/user.js'
import auth from "./middleware/auth.js";
app.use('/users', userRoute)

export default app;
