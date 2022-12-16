import { Request, Response } from 'express';
import prisma from '../prisma';
import { CustomRequest } from '../types';

export const getOneUpdate = async (req: Request, res: Response) => {
	const update = await prisma.update.findFirst({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: update });
};

export const getUpdates = async (req: CustomRequest, res: Response) => {
	const products = await prisma.product.findMany({
		where: {
			ownerId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	res.json({ data: updates });
};

export const createUpdate = async (req: Request, res: Response) => {
	const product = await prisma.product.findUnique({
		where: {
			id: req.body.productId,
		},
	});

	if (!product) {
		// does not belong to user
		res.status(400);
		return res.json({ message: 'Nope' });
	}

	const update = await prisma.update.create({
		data: {
			title: req.body.title,
			body: req.body.body,
			product: { connect: { id: product.id } },
		},
	});

	// console.log(update);

	res.json({ data: update });
};

export const updateUpdate = async (req: CustomRequest, res: Response) => {
	const products = await prisma.product.findMany({
		where: {
			ownerId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		// handle this
		res.json({ message: 'Nope' });
	}

	const updatedUpdate = await prisma.update.update({
		where: {
			id: req.params.id,
		},
		data: req.body,
	});

	res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req: CustomRequest, res: Response) => {
	const products = await prisma.product.findMany({
		where: {
			ownerId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		// handle this
		res.json({ message: 'Nope' });
	}

	const deleted = await prisma.update.delete({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: deleted.id });
};
