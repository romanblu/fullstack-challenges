import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutCart } from "../services/cart";
import { CartContext } from "../context/CartContext";
import OrderSummary from "../features/cart/OrderSummary";
import Navbar from "../components/layout/Navbar";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
 
    try {
      setLoading(true);

      const res = await checkoutCart();

      navigate(`/order-success/${res._id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="bg-slate-50">
        <Navbar theme="light"/>
        <div className="container max-w-[900px] mx-auto p-6 ">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <OrderSummary cart={cart} />

        <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-lime-500 py-3 rounded mt-6"
        >
            {loading ? "Processing..." : "Place Order"}
        </button>
        </div>
    </div>
  );
};

export default CheckoutPage;