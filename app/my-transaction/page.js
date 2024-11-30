"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { bayarTransaction, myTransaction, ubahStatusTransaction } from "../utils/api";

const MyTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await myTransaction();
        setTransactions(data.data);
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleCancel = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id ? { ...transaction, status: "Cancelled" } : transaction
      )
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleBayar = async (id) => {
    if (!selectedImage) {
      setError("Please upload a proof of payment image.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("proof_of_payment", selectedImage);

      const proofPaymentUrl = URL.createObjectURL(selectedImage);
      const response = await bayarTransaction(id, proofPaymentUrl, formData);
      if (response.status === "Ok") {
        const statusResponse = await ubahStatusTransaction(id);
        if (statusResponse.status === "Ok") {
          setTransactions((prevTransactions) =>
            prevTransactions.map((transaction) =>
              transaction.id === id ? { ...transaction, status: "success" } : transaction
            )
          );
          setSelectedImage(null);
        }
      }
    } catch (err) {
      console.log("Failed to process payment:", err);
      setError("Failed to complete payment");
    } finally {
      setUploading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount / 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="mb-4 text-2xl font-semibold">Transaction List</h1>
        <Link href="/" passHref>
          <button className="px-6 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">Go to Home</button>
        </Link>
      </div>
      <div className="w-full space-y-6">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="text-lg font-semibold text-gray-900">{formatDate(transaction.createdAt)}</div>
            <div className="mt-2 text-sm text-gray-600">{transaction.transaction_items[0]?.title || "No title"}</div>
            <div className="mt-1 text-sm text-gray-500">
              {transaction.transaction_items[0]?.description || "No description"}
            </div>
            <div className="mt-2 text-lg font-semibold">{formatCurrency(transaction.totalAmount)}</div>
            <div className="mt-2">
              <span
                className={
                  transaction.status === "success"
                    ? "text-green-500"
                    : transaction.status === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }
              >
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Payment Method: {transaction.payment_method?.name || "Unknown"}
            </div>
            <div className="flex mt-4 space-x-2">
              {transaction.status === "pending" && (
                <>
                  <button
                    onClick={() => handleBayar(transaction.id)}
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Bayar
                  </button>
                  <button
                    onClick={() => handleCancel(transaction.id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </>
              )}
              {transaction.status === "success" && (
                <button className="px-4 py-2 text-white bg-gray-500 rounded cursor-not-allowed" disabled>
                  Completed
                </button>
              )}
              {transaction.status === "Cancelled" && (
                <button className="px-4 py-2 text-white bg-gray-500 rounded cursor-not-allowed" disabled>
                  Cancelled
                </button>
              )}
            </div>
            {transaction.status === "pending" && (
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                  className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
                {selectedImage && <p className="mt-2 text-sm text-gray-500">Selected file: {selectedImage.name}</p>}
                {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTransaction;
