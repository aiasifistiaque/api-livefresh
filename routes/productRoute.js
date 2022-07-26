import express from 'express';
import createProduct from '../controllers/products/createProduct.js';
import getAllProducts from '../controllers/products/getAllProducts.js';
import getProductById from '../controllers/products/getProductById.js';
import getProductsByCategory from '../controllers/products/getProductsByCategory.js';
import { admin, protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', sort, getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);
router.get('/category/:id', sort, getProductsByCategory);

export default router;
