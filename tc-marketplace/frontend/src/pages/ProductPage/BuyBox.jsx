export function BuyBox({ product }) {
  const inStock = product.quantity > 0;

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold">${product.price}</span>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Variants placeholder */}
      {product.variants?.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-1">Options</p>
          <select className="w-full border rounded-lg p-2">
            {product.variants.map(v => (
              <option key={v._id} value={v._id}>
                {v.name} — ${v.price}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        disabled={!inStock}
        className="max-w-[150px] w-full bg-emerald-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium transition disabled:opacity-50"
      >
        Add to Cart
      </button>

      {/* Trust badges */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>✔ Secure checkout</p>
        <p>✔ 30-day return policy</p>
        <p>✔ Verified seller</p>
      </div>
    </div>
  );
}