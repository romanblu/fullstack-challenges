import express from 'express';
import {addCartItem, updateCart, deleteCartItem, cartCheckout} from './cart.controller.js';

const router = express.Router();

router.post('/add', addCartItem);
router.patch('/update', updateCart);
router.delete('/delete', deleteCartItem);
router.post('/checkout', cartCheckout);

export default router