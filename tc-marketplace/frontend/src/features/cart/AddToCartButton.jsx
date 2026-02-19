import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext"

const AddToCartButton = ({ productId, variantId }) => {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await addToCart({
        productId,
        variantId,
        quantity: 1
      });

      alert("Added to cart!");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="max-w-[150px] w-full bg-emerald-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium transition disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;