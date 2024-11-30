"use client";
import React, { useState, useEffect } from "react";
import { getCart, deleteCart, updateCart, createTransaction, getPaymentMethod } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import CartItem from "../components/cartitem/page";
import PaymentMethodSelector from "../components/paymentmethod/page";
import TotalPrice from "../components/totalprice/page";
import CheckoutButton from "../components/checkoutbutton/page";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const router = useRouter();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.activity.price_discount * item.quantity, 0);
  };

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

  const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    try {
      const cartIds = cartItems.map((item) => item.id);
      console.log("Selected cart IDs: ", cartIds);

      const response = await createTransaction(cartIds, selectedPaymentMethod);
      if (response.status === "OK") {
        toast.success("Transaction created successfully!");
        router.push("/my-transaction");
      } else {
        toast.error("Failed to create transaction.");
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    }
  };

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
  }, []);

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

              <div className="mt-4">
                <PaymentMethodSelector
                  paymentMethods={paymentMethods}
                  selectedPaymentMethod={selectedPaymentMethod}
                  onPaymentMethodChange={handlePaymentMethodChange}
                />
              </div>

              <div className="mt-6">
                <CheckoutButton handleCheckout={handleCheckout} selectedPaymentMethod={selectedPaymentMethod} />
              </div>
            </div>
          )}
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default Cart;
