import asyncHandler from '../../utils/asyncHandler.js'
import * as cartService from './cart.service.js'

export const addCartItem = asyncHandler(async (req, res) => {
    const {productId,
        variantId,
        name,
        price,
        quantity,
        storeId,
        image} = req.body
       
    const cart = await cartService.addCartItem({
        sessionId: req.cartSessionId,
        productId,
        variantId,
        quantity
    })
    


    res.status(200).json({
        success: true,
        message: "Item added to cart",
        data: cart
    })
})

export const updateCartItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
        throw ApiError.badRequest("Quantity is required");
    }
    console.log("ITEM ID PARAMS", itemId)
    const cart = await cartService.updateCartItem({ 
        sessionId: req.cartSessionId,
        itemId,
        quantity
    })

    res.status(200).json({
        success: true,
        message: "Cart updated",
        data: cart
    });

})

export const deleteCartItem = asyncHandler(async (req, res) => {

})

export const cartCheckout = asyncHandler(async (req, res) => {

})