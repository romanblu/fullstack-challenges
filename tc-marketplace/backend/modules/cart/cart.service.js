import ApiError from "../../utils/ApiError.js"
import Product from "../product/product.model.js";
import Cart from "./cart.model.js";

export async function addCartItem({sessionId, productId, variantId=null, quantity=1}) {
    console.log("Adding to cart:", productId)
    if(!productId || quantity < 1) {
        throw ApiError.badRequest("Product ID and valid quantity are required");
    }

    const product = await Product.findById(productId);
    if(!product) {
        throw ApiError.notFound("Product not found");
    }
    
    if(product.status !== "available") {
        throw ApiError.badRequest("This product is not available");
    }

    let price, stock, variantName=null

    if(variantId) {
        const variant = product.variants.id(variantId);

        if(!variant) {
            throw ApiError.notFound("Product variant not found");
        }

        if( variant.status !== "active") {
            throw ApiError.badRequest("This product variant is not available");
        }

        price = variant.price || product.price
        stock = variant.stock || 0
        variantName = variant.name
    } else{
        price = product.price
        stock = product.quantity || 0
    }

    if(stock < quantity) {
        throw ApiError.badRequest("Insufficient stock for the requested quantity");
    }

    //get cart or create new
    console.log("Finding cart for session:", sessionId)
    const cart = await Cart.findOne({ sessionId }) || 
            await Cart.create({ sessionId, items: [] })

    //check if item already in cart
    const existingItem = cart.items.find(item =>
        item.productId.toString() === productId.toString() &&
        String(item.variantId || "") === String(variantId || "")
    )
    if(existingItem){
        if(existingItem.quantity + quantity > stock) {
            throw ApiError.badRequest("Adding this quantity exceeds available stock");
        }

        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            variantId,
            name: variantName || product.name,
            price,
            quantity,
            storeId: product.store,
            image: product.images[0]?.url || ""
        })
    }

    cart.updatedAt = new Date()

    await cart.save();

    return cart
}


export async function updateCart(sessionId, items) {

}

export async function deleteCartItem(sessionId, cartItemId) {

}

export async function cartCheckout(sessionId) {

}