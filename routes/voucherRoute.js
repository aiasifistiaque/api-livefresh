import express from 'express';
import getUseReferral from '../controllers/users/getUseReferral.js';
import createVoucher from '../controllers/vouchers/createVouchers.js';
import getAllVouchers from '../controllers/vouchers/getAllVouchers.js';
import { admin, protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', protect, admin, sort, getAllVouchers);
// router.get('/:id', () => {});
router.post('/', protect, admin, createVoucher);
router.post('/referral', protect, getUseReferral);

export default router;
