import React from "react";

const PaymentMethodSelector = ({ paymentMethods = [], selectedPaymentMethod, onPaymentMethodChange }) => {
  return (
    <div className="w-full">
      <label htmlFor="paymentMethod" className="block mb-2 text-lg font-medium text-gray-700">
        Payment Method
      </label>
      <select
        id="paymentMethod"
        value={selectedPaymentMethod}
        onChange={onPaymentMethodChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select payment method</option>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((paymentMethod) => (
            <option key={paymentMethod.id} value={paymentMethod.id}>
              {paymentMethod.name}
            </option>
          ))
        ) : (
          <option disabled>No payment methods available</option>
        )}
      </select>
    </div>
  );
};

export default PaymentMethodSelector;
