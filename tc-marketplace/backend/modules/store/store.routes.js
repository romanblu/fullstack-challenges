import express from 'express';
import { protect, requireRole } from '../../middleware/auth.js';
import {
  getMyStore,
  updateMyStore,
  getMyProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getStore,
} from './store.controller.js';

const router = express.Router();

// Seller info & store
router.get('/', protect, requireRole('seller'), getMyStore);
router.get('/:id',  getStore);
router.put('/', protect, requireRole('seller'), updateMyStore);

// Product management
router.get('/products', protect, requireRole('seller'), getMyProducts);
router.post('/products', protect, requireRole('seller'), addProduct);
router.put('/products/:id', protect, requireRole('seller'), updateProduct);
router.delete('/products/:id', protect, requireRole('seller'), deleteProduct);

export default router;