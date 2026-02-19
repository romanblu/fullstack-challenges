import { createContext, useContext, useEffect, useState } from "react";
import { addToCart as addToCartAPI } from "../services/cart";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
    const res = await fetch("/api/cart", {
        credentials: "include"
        });
        const data = await res.json();
        setCart(data.data);
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

    
    const cartCount = cart?.items?.reduce(
        (sum, item) => sum + item.quantity, 0) || 0;

    return (
        <CartContext.Provider value={{ cart, setCart, cartCount, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );

}