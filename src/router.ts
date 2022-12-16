import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import {
	createProduct,
	deleteProduct,
	getOneProduct,
	getProducts,
	updateProduct,
} from './handlers/product';
import {
	createUpdate,
	deleteUpdate,
	getOneUpdate,
	getUpdates,
	updateUpdate,
} from './handlers/update';
import { handleInputError } from './utils/middleware';

const router = Router();

/**
 * Product
 */

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);

router.put(
	'/product/:id',
	body('name').isString(), // middleware for validation
	handleInputError,
	updateProduct
);

router.post(
	'/product',
	body('name').isString(),
	handleInputError,
	createProduct
);

router.delete('/product/:id', deleteProduct);

/**
 * Update
 */

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
	'/update/:id',
	body(['title', 'version', 'asset', 'body']).optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	updateUpdate
);
router.post(
	'/update',
	body(['title', 'body', 'productId']).exists().isString(),
	createUpdate
);
router.delete('/update/:id', deleteUpdate);

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
