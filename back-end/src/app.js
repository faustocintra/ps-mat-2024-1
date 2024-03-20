import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import dotenv from 'dotenv'
//carrega as variáveis de ambiente do arquivo .env
dotenv.config()

import indexRouter from "./routes/index.js";
//import usersRouter from "./routes/users.js";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
//app.use("/users", usersRouter);

/************************************
 * ROTAS DE API
 ************************************/

// Middleware que protege as rotas com autenticação
import auth from './middleware/auth.js'
app.use(auth)

import carRoute from './routes/car.js'
app.use('/cars', carRoute)

import usersRoute from './routes/user.js'
app.use('/users', usersRoute)

import customerRoute from './routes/customer.js'
app.use('/customers', customerRoute)

export default app;
