import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderBuyId,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderBuyId);

export default router;
