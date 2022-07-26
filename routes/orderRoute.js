import express from 'express';
import createOrder from '../controllers/orders/createOrder.js';
import editOrderStatus from '../controllers/orders/editOrderStatus.js';
import getAllOrders from '../controllers/orders/getAllOrders.js';
import getMyOrders from '../controllers/orders/getMyOrders.js';
import getOrderById from '../controllers/orders/getOrderById.js';
import { admin, protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', protect, sort, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, admin, editOrderStatus);
router.post('/', protect, sort, createOrder);
router.get('/admin/all', protect, admin, sort, getAllOrders);

export default router;
