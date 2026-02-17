import express from 'express';
import {addCartItem, updateCartItem, deleteCartItem, cartCheckout} from './cart.controller.js';
import { ensureCartSession } from '../../middleware/session.js';

const router = express.Router();

router.post('/add',ensureCartSession, addCartItem);
router.patch('/items/:itemId', ensureCartSession, updateCartItem);
router.delete('/delete', ensureCartSession, deleteCartItem);
router.post('/checkout', ensureCartSession, cartCheckout);

export default router