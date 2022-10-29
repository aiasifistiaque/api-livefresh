import express from 'express';
import getAllUsers from '../controllers/users/getAllUsers.js';
import getUserById from '../controllers/users/getUserById.js';
import getUserByVoucher from '../controllers/users/getUserByVoucher.js';
import { admin, protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', protect, admin, sort, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.get('/voucher/:id', getUserByVoucher);

export default router;
