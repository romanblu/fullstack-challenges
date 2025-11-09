import express from 'express';
import { protect, requireRole } from '../../middleware/auth.js';
import {
  getMyStore,
  updateMyStore,
  getMyProducts,
  getStore,
} from './store.controller.js';

const router = express.Router();

// Seller info & store
router.get('/', protect, requireRole('seller'), getMyStore);
router.get('/:id',  getStore);
router.put('/', protect, requireRole('seller'), updateMyStore);

// Product management
router.get('/products', protect, requireRole('seller'), getMyProducts);

export default router;