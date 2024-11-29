import React from "react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount).replace("Rp", "Rp.");
  };

  return (
    <li className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-sm text-gray-600">
          Price: <span className="line-through">{formatRupiah(item.activity.price)}</span>
        </p>
        <p className="text-sm text-gray-600">Discount Price: {formatRupiah(item.activity.price_discount)}</p>
        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)} // Increment quantity
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={() => {
            if (item.quantity === 1) {
              removeItem(item.id); // If quantity is 1, remove item
            } else {
              updateQuantity(item.id, item.quantity - 1); // Otherwise, decrement quantity
            }
          }}
          className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
          disabled={item.quantity <= 1} // Disable decrement if quantity is 1
        >
          -
        </button>
        <button
          onClick={() => removeItem(item.id)}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
