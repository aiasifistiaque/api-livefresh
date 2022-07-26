import express from 'express';
import createAddress from '../controllers/address/createAddress.js';
import getMyAddress from '../controllers/address/getMyAddress.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', protect, getMyAddress);
router.post('/', protect, createAddress);

export default router;
