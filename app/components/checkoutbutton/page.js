import React from "react";
import { toast } from "react-hot-toast";

const CheckoutButton = ({ handleCheckout, selectedPaymentMethod }) => {
  return (
    <button onClick={handleCheckout} className="w-full py-3 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
      Checkout
    </button>
  );
};

export default CheckoutButton;
