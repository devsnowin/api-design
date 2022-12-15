import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { handleInputError } from './utils/middleware';

const router = Router();

/**
 * Product
 */

router.get('/product', (req, res) => {
	res.json({
		status: 'ok',
		message: 'product',
	});
});
router.get('/product/:id', () => {});

router.put(
	'/product/:id',
	body('name').isString(), // middleware for validation
	handleInputError,
	(req: Request, res: Response) => {}
);

router.post(
	'/product',
	body('name').isString(),
	handleInputError,
	(req, res) => {}
);

router.delete('/product/:id', () => {});

/**
 * Update
 */

router.get('/update', () => {});
router.get('/update/:id', () => {});

router.put(
	'/update/:id',
	body(['title', 'version', 'asset', 'body']).optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
	() => {}
);

router.post('/update', body(['title', 'body']).exists().isString(), () => {});

router.delete('/update/:id', () => {});

/**
 * Update Points
 */

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});

router.put(
	'/updatepoint/:id',
	body(['name', 'description']).optional().isString(),
	() => {}
);

router.post(
	'/updatepoint',
	body(['name', 'description']).optional().isString(),
	body('updateId').exists().isString(),
	() => {}
);

router.delete('/updatepoint/:id', () => {});

export default router;
