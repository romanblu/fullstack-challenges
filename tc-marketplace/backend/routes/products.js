import express from 'express';
import { protect, requireRole } from '../middleware/auth.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, getFeaturedProducts } from '../controllers/productController.js';

const router = express.Router();
router.get('/', listProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);
router.post('/', protect, requireRole('seller'), createProduct);
router.put('/:id', protect, requireRole('seller'), updateProduct);
router.delete('/:id', protect, requireRole('seller'), deleteProduct);
export default router;