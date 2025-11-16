import express from 'express';
import { protect, requireRole } from '../../middleware/auth.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, getFeaturedProducts, getSellerProducts } from './product.contoller.js';

// TODO : add validation middleware for create and update 
const router = express.Router();
router.get('/', listProducts);
router.get('/featured', getFeaturedProducts);
router.get('/seller/:id', getSellerProducts);
router.get('/:id', getProduct);
router.post('/', protect, requireRole('seller'), createProduct);
router.put('/:id', protect, requireRole('seller'), updateProduct);
router.delete('/:id', protect, requireRole('seller'), deleteProduct);
export default router;