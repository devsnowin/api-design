import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import router from './router';
import { protect } from './utils/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

/** middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Routes **/
app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);

export default app;
