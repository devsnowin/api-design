import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import router from './router';
import { protect } from './utils/auth';
import { createNewUser, signIn } from './handlers/user';
import { errorHandler } from './utils/errorHandler';

const app = express();

/** middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Routes **/
app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);

/** Error handler **/
app.use(errorHandler);

export default app;
