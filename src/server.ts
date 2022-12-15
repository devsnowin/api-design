import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { createNewUser, signIn } from './handlers/user';

import router from './router';
import { protect } from './utils/auth';

const app = express();

/** middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);

export default app;
