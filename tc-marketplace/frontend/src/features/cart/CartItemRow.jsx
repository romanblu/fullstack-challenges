import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartItemRow = ({ item }) => {
  const { updateCartItem, deleteCartItem } = useContext(CartContext);

  return (
    <div className="flex gap-4 border border-emerald-600 rounded-xl p-4 bg-slate-50">
      <img src={item.image} className="w-24 h-24 object-cover rounded" />

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p>${item.price}</p>

        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => updateCartItem(item._id, item.quantity - 1)}>
            −
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => updateCartItem(item._id, item.quantity + 1)}>
            +
          </button>

          <button
            onClick={() => deleteCartItem(item._id)}
            className="ml-4 text-red-500"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItemRow;