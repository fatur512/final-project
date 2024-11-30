import axiosInstance from "./client";
import Cookie from "js-cookie";

const getAuthToken = () => {
  return Cookie.get("authToken");
};

export const getActivities = async () => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.get("/activities", config);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch journal entries:", error);
    throw error;
  }
};

export const postCart = async (activityId) => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.post("/add-cart", { activityId }, config);
    console.log("Response Post Cart:", response);
    return response.data;
  } catch (error) {
    console.log("Failed to add item to the cart:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.get("/carts", config);
    return response.data;
  } catch (error) {
    console.log("Failed to retrieve cart:", error);
    throw error;
  }
};

export const deleteCart = async (cartId) => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.delete(`/delete-cart/${cartId}`, config);
    return response.data;
  } catch (error) {
    console.error("Failed to delete cart:", error);
    throw error;
  }
};

export const updateCart = async (cartId, quantity) => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.post(`/update-cart/${cartId}`, { quantity }, config);
    return response.data;
  } catch (error) {
    console.error("Failed to update cart:", error);
    throw error;
  }
};

export const getPaymentMethod = async () => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.get("/payment-methods", config);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch payment methods:", error);
    throw error;
  }
};

export const createTransaction = async (cartIds, paymentMethodId) => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const data = {
      cartIds: cartIds,
      paymentMethodId: paymentMethodId,
    };
    const response = await axiosInstance.post("/create-transaction", data, config);
    return response.data;
  } catch (error) {
    console.error("Failed to create transaction:", error);
    throw error;
  }
};

export const myTransaction = async () => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.get("/my-transactions", config);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user transactions:", error);
    throw error;
  }
};

export const bayarTransaction = async (transactionId, proofPaymentUrl) => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const data = {
      proofPaymentUrl: proofPaymentUrl || "https://www.google.com/",
    };
    const url = `/update-transaction-proof-payment/${transactionId}`;
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    console.log("Failed to update transaction:", error);
    throw error;
  }
};

export const ubahStatusTransaction = async (transactionId) => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const url = `/update-transaction-status/${transactionId}`;
    const response = await axiosInstance.post(url, config);
    return response.data;
  } catch (error) {
    console.log("Failed to update transaction status:", error);
    throw error;
  }
};

export const getTransactionDetails = async (transactionId) => {
  try {
    const token = getAuthToken();
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axiosInstance.get(`/transaction/${transactionId}`, config);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch transaction details:", error);
    throw error;
  }
};
