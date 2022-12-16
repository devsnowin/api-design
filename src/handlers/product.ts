import { Response } from 'express';
import prisma from '../prisma';
import { CustomRequest } from '../types';

// Get all
export const getProducts = async (req: CustomRequest, res: Response) => {
	const products = await prisma.product.findMany({
		where: {
			ownerId: req.user.id,
		},
	});

	res.json({ data: products });
};

// Get one
export const getOneProduct = async (req: CustomRequest, res: Response) => {
	const product = await prisma.product.findFirst({
		where: {
			id: req.params.id,
			ownerId: req.user.id,
		},
	});

	res.json({ data: product });
};

// Create product
export const createProduct = async (req: CustomRequest, res: Response) => {
	const product = await prisma.product.create({
		data: {
			name: req.body.name,
			ownerId: req.user.id,
		},
	});

	res.json({ data: product });
};

// update product
export const updateProduct = async (req: CustomRequest, res: Response) => {
	const updated = await prisma.product.update({
		where: {
			id_ownerId: {
				id: req.params.id,
				ownerId: req.user.id,
			},
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: updated });
};

// delete product
export const deleteProduct = async (req: CustomRequest, res: Response) => {
	const deleted = await prisma.product.delete({
		where: {
			id_ownerId: {
				id: req.params.id,
				ownerId: req.user.id,
			},
		},
	});

	res.json({ data: deleted.id });
};
