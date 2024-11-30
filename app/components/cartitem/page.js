import React from "react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  if (!item || !item.activity) {
    return <div>Loading...</div>;
  }

  const { name, id, quantity, activity } = item;
  const { price, price_discount } = activity;

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount).replace("Rp", "Rp.");
  };

  return (
    <li className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">
          Price: <span className="line-through">{formatRupiah(price)}</span>
        </p>
        <p className="text-sm text-gray-600">Discount Price: {formatRupiah(price_discount)}</p>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => updateQuantity(id, quantity + 1)}
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={() => {
            if (quantity === 1) {
              removeItem(id);
            } else {
              updateQuantity(id, quantity - 1);
            }
          }}
          className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
          disabled={quantity <= 1}
        >
          -
        </button>
        <button onClick={() => removeItem(id)} className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
