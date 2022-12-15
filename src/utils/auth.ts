import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const comparePassword = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
	return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
	const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({
			message: 'Not Authorized',
		});

		return;
	}

	const [, token] = bearer.split(' ');

	if (!token) {
		res.status(401);
		res.json({
			message: 'Not valid token',
		});
		return;
	}

	try {
		const user = jwt.verify(token, SECRET_KEY);
		req.user = user;
		next();
	} catch (e) {
		/** debug */
		console.log(e);

		res.status(401);
		res.json({
			message: 'Not valid token',
		});
		return;
	}
};
