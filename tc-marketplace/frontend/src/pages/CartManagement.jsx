import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItemList from "../features/cart/CartItemList";
import CartSummary from "../features/cart/CartSummary";
import { useNavigate } from "react-router-dom";

export default function CartManagement() {
    const { cart, fetchCart } = useContext(CartContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);


    if (cart === null) {
        return (
        <div className="min-h-[80vh] flex items-center justify-center">
            Loading cart...
        </div>
        );
    }
    return (
    <section className=" bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50   min-h-[80vh] ">
            <Navbar />
            <div className="mx-auto max-w-4xl my-12 bg-slate-100 px-4 py-8 rounded-lg shadow-lg flex flex-col text-green-900 min-h-[60vh]">
                <h1 className="text-3xl font-bold  mb-4"> Cart management </h1>
                {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
                {cart?.length === 0 && <p className="text-center text-green-700">Your cart is empty</p>}
                <div className="grid md:grid-cols-3 gap-6">
                    <CartItemList items={cart.items} />
                    <CartSummary cart={cart} />
                </div>
            </div>

    </section>
    )


}