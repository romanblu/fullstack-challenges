import React from "react";

const OrderSummary = ({ cart }) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="border rounded-xl p-6 shadow-sm">
        <p className="text-center text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5; // example rule
  const tax = subtotal * 0.1; // example 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="border rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      {/* Items */}
      <div className="space-y-3">
        {cart.items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId || ""}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                {item.variantName && (
                  <p className="text-sm text-gray-500">{item.variantName}</p>
                )}
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <hr />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;