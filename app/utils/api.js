// utils/api.js

import axiosInstance from "./client";
import Cookie from "js-cookie"; // Import js-cookie to get the token from cookies

// Helper function to get the auth token from cookies
const getAuthToken = () => {
  return Cookie.get("authToken"); // Retrieve the auth token from cookies
};

// Get all journal entries
export const getActivities = async () => {
  try {
    const token = getAuthToken(); // Retrieve the auth token from cookies
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.get("/activities", config); // Fetch activities
    return response.data;
  } catch (error) {
    console.log("Failed to fetch journal entries:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// POST request to add an item to the cart
export const postCart = async (activityId) => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.post("/add-cart", { activityId }, config); // Add to cart
    console.log("Response Post Cart:", response);
    return response.data;
  } catch (error) {
    console.log("Failed to add item to the cart:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// GET request to retrieve the cart
export const getCart = async () => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.get("/carts", config); // Fetch cart data
    return response.data;
  } catch (error) {
    console.log("Failed to retrieve cart:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// DELETE request to delete the cart
export const deleteCart = async (cartId) => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.delete(`/delete-cart/${cartId}`, config); // Delete cart
    return response.data;
  } catch (error) {
    console.error("Failed to delete cart:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// POST request to update the cart with a given quantity
export const updateCart = async (cartId, quantity) => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.post(`/update-cart/${cartId}`, { quantity }, config); // Update cart
    return response.data;
  } catch (error) {
    console.error("Failed to update cart:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// GET request to retrieve the available payment methods
export const getPaymentMethod = async () => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.get("/payment-methods", config); // Fetch payment methods
    return response.data;
  } catch (error) {
    console.log("Failed to fetch payment methods:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// POST request to create a transaction
export const createTransaction = async (cartIds, paymentMethodId) => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const data = {
      cartIds: cartIds, // Array of cart IDs
      paymentMethodId: paymentMethodId, // Payment method ID
    };

    const response = await axiosInstance.post("/create-transaction", data, config); // Create transaction
    return response.data;
  } catch (error) {
    console.error("Failed to create transaction:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// GET request to retrieve the user's transactions
export const myTransaction = async () => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.get("/my-transactions", config); // Fetch user transactions
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user transactions:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// POST request to update the payment proof of a transaction
export const bayarTransaction = async (transactionId, proofPaymentUrl) => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const data = {
      proofPaymentUrl: proofPaymentUrl || "https://www.google.com/", // Default URL if not provided
    };

    const url = `/update-transaction-proof-payment/${transactionId}`;
    const response = await axiosInstance.post(url, data, config); // Update transaction with proof of payment
    return response.data;
  } catch (error) {
    console.log("Failed to update transaction:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// POST request to update the status of a transaction
export const ubahStatusTransaction = async (transactionId) => {
  try {
    const token = getAuthToken(); // Get token
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const url = `/update-transaction-status/${transactionId}`;
    const response = await axiosInstance.post(url, config); // Update transaction status
    return response.data;
  } catch (error) {
    console.log("Failed to update transaction status:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// GET request to retrieve the details of a transaction
export const getTransactionDetails = async (transactionId) => {
  try {
    const token = getAuthToken(); // Get token from cookies
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axiosInstance.get(`/transaction/${transactionId}`, config); // Make the API call to fetch transaction data
    return response.data; // Return the data from the API response
  } catch (error) {
    console.log("Failed to fetch transaction details:", error);
    throw error;
  }
};
