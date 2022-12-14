import express from 'express';
import morgan from 'morgan';

import router from './router';

const app = express();

/** middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.secret = 'monkey';
	next();
});

app.use('/api', router);

export default app;
