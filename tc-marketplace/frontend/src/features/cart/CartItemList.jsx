import CartItemRow from "./CartItemRow";

const CartItemList = ({ items }) => {
  return (
    <div className="md:col-span-2 space-y-4">
      {items.map(item => (
        <CartItemRow key={item._id} item={item} />
      ))}
    </div>
  );
};

export default CartItemList;