import { createContext, useContext, useEffect, useState } from "react";
import { addToCart as addToCartAPI, getCart } from "../services/cart";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        const cart = await getCart();
        setCart(cart);
    };

    
    useEffect(() => {
        fetchCart();
    }, []);


    const addToCart = async ({
        productId,
        variantId = null,
        quantity = 1
    }) => {
        const updatedCart = await addToCartAPI({ productId, variantId, quantity})
        setCart(updatedCart);
    };

    
    const cartCount = cart?.items?.length

    return (
        <CartContext.Provider value={{ cart, setCart, cartCount, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );

}