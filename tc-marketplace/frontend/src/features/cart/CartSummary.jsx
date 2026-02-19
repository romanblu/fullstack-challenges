import { useNavigate } from "react-router-dom";

const CartSummary = ({ cart }) => {
  const navigate = useNavigate();



  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) return;
    navigate("/cart/checkout");
  };

  return (
    <div className="border  border-emerald-600 rounded-xl p-4 bg-slate-50 h-fit">
      <h2 className="font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <button onClick={handleCheckout} className="w-full bg-lime-500 hover:bg-lime-600 py-2 rounded mt-4">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;