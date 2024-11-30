import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTransactionDetails } from "../../utils/api";

const TransactionSuccess = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTransactionData = async () => {
        try {
          const data = await getTransactionDetails(id);
          setTransactionDetails(data);
        } catch (error) {
          console.error("Error fetching transaction details:", error);
          setError("Failed to load transaction details. Please try again later.");
          setTransactionDetails(null);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactionData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!transactionDetails) {
    return <div>No transaction details found.</div>;
  }

  const formatCurrency = (amount) => {
    if (amount == null) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount / 100);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-2xl font-semibold">Transaction Successful</h1>
      <div className="space-y-4">
        <div>
          <div className="text-lg font-semibold">Transaction ID: {transactionDetails.id}</div>
          <div className="text-sm text-gray-600">Date: {transactionDetails.date || "N/A"}</div>
        </div>
        <div>
          <h2 className="font-semibold">Items</h2>
          <ul className="space-y-2">
            {transactionDetails.items && transactionDetails.items.length > 0 ? (
              transactionDetails.items.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <strong>{item.title}</strong>: {item.description || "No description available"}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-600">No items found in the transaction.</li>
            )}
          </ul>
        </div>
        <div className="mt-4 text-lg font-semibold">Total: {formatCurrency(transactionDetails.amount)}</div>
      </div>
      <div className="flex mt-6 space-x-4">
        <button onClick={() => router.push("/")} className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Back to Home
        </button>
        <button onClick={handlePrintInvoice} className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600">
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default TransactionSuccess;
