"use client";
import React, { useState, useEffect } from "react";
import { getCart, deleteCart, updateCart, createTransaction, getPaymentMethod } from "../utils/api"; // Ensure correct path
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import Link from "next/link"; // Import Link for navigation
import CartItem from "../components/cartitem/page"; // Import CartItem component
import PaymentMethodSelector from "../components/paymentmethod/page"; // Import PaymentMethodSelector
import TotalPrice from "../components/totalprice/page"; // Import TotalPrice
import CheckoutButton from "../components/checkoutbutton/page"; // Import CheckoutButton
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [paymentMethods, setPaymentMethods] = useState([]); // State to hold available payment methods
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State for selected payment method
  const router = useRouter(); // Initialize the useRouter hook

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.activity.price_discount * item.quantity, 0);
  };

  // Remove item from the cart
  const removeItem = async (id) => {
    try {
      const response = await deleteCart(id);
      if (response.status === "OK") {
        setCartItems(cartItems.filter((item) => item.id !== id));
        toast.success("Item removed from the cart!");
      } else {
        toast.error("Failed to remove item from the cart.");
      }
    } catch (error) {
      toast.error("An error occurred while removing the item.");
    }
  };

  // Update item quantity in the cart
  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await updateCart(id, newQuantity);
      if (response.status === "OK") {
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
        toast.success("Quantity updated successfully!");
      } else {
        toast.error("Failed to update item quantity.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the quantity.");
    }
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    try {
      // Extract cartIds from the cartItems array
      const cartIds = cartItems.map((item) => item.id);
      console.log("Selected cart IDs: ", cartIds);

      // Create transaction with selected cart items and payment method
      const response = await createTransaction(cartIds, selectedPaymentMethod);
      if (response.status === "OK") {
        toast.success("Transaction created successfully!");
        router.push("/my-transaction"); // Redirect to transaction page
      } else {
        toast.error("Failed to create transaction.");
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    }
  };

  // Fetch cart data and payment methods on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data.data || []);
      } catch (error) {
        setError("Failed to load cart.");
        toast.error("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const data = await getPaymentMethod();
        setPaymentMethods(data.data || []);
      } catch (error) {
        setError("Failed to load payment methods.");
        toast.error("Failed to load payment methods.");
      }
    };

    fetchCart();
    fetchPaymentMethods();
  }, []); // Run on mount

  // Handle change of selected payment method
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <Link href="/" passHref>
              <button className="px-6 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">Go to Home</button>
            </Link>
          </div>

          {/* Display loading, error, or cart items */}
          {loading ? (
            <p className="text-xl">Loading...</p>
          ) : error ? (
            <p className="text-xl text-red-500">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-xl">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
                ))}
              </ul>

              <TotalPrice total={calculateTotal()} />

              {/* Payment method selector */}
              <PaymentMethodSelector
                paymentMethods={paymentMethods}
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
              />

              {/* Checkout button */}
              <CheckoutButton handleCheckout={handleCheckout} selectedPaymentMethod={selectedPaymentMethod} />
            </div>
          )}
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Cart;
