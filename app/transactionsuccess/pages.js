import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTransactionDetails } from "../../utils/api"; // Ensure you have an API function for this

const TransactionSuccess = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic transaction ID from the URL
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to manage the UI
  const [error, setError] = useState(null); // Error state for better error feedback

  // Fetch transaction details using the transaction ID passed in the URL
  useEffect(() => {
    if (id) {
      const fetchTransactionData = async () => {
        try {
          const data = await getTransactionDetails(id); // API call to fetch transaction details
          setTransactionDetails(data);
        } catch (error) {
          console.error("Error fetching transaction details:", error);
          setError("Failed to load transaction details. Please try again later.");
          setTransactionDetails(null); // Handle error gracefully
        } finally {
          setLoading(false); // Set loading state to false once data is fetched
        }
      };

      fetchTransactionData();
    }
  }, [id]); // Re-run the effect if the ID changes

  if (loading) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an issue
  }

  if (!transactionDetails) {
    return <div>No transaction details found.</div>; // Error state if transaction details are not found
  }

  const formatCurrency = (amount) => {
    if (amount == null) return "Rp 0"; // Default value in case amount is null or undefined
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount / 100); // Assuming the amount is in cents
  };

  const handlePrintInvoice = () => {
    // Triggering the browser's print dialog for the current page (Invoice View)
    window.print();
  };

  return (
    <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-2xl font-semibold">Transaction Successful</h1>
      <div className="space-y-4">
        <div>
          <div className="text-lg font-semibold">Transaction ID: {transactionDetails.id}</div>
          <div className="text-sm text-gray-600">Date: {transactionDetails.date || "N/A"}</div>{" "}
          {/* Fallback if no date */}
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
