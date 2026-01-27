import express from 'express';

const router = express.Router();

router.post('/add', addCartItem);
router.patch('/update', updateCart);
router.delete('/delete', deleteCartItem);
router.post('/checkout', checkoutCart);