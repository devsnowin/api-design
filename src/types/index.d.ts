import express, { Request } from 'express';

type User = {
	id: string;
	username: string;
};

export interface CustomRequest extends Request {
	user: User;
}
