import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

/************************************************
 * ROTAS DA API
************************************************/

import carRoute from './routes/car.js'
app.use('/cars', carRoute)

import usersRoute from './routes/users.js'
app.use('/users', usersRoute)

import costumersRoute from './routes/costumer.js'
app.use('/costumers', costumersRoute)

export default app;
