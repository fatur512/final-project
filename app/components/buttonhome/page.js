"use client"; // Ensure this component is rendered client-side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter hook

const ButtonHome = () => {
  const [isClient, setIsClient] = useState(false); // State to track if we're on the client-side
  const router = useRouter(); // Initialize the router

  // Effect hook to ensure the code is executed only on the client-side
  useEffect(() => {
    setIsClient(true); // Set to true when mounted on the client
  }, []);

  // Function to navigate to the homepage
  const navigateToHome = () => {
    router.push("/"); // Navigate to the home page
  };

  // Render nothing or a loading state while waiting for client-side mount
  if (!isClient) {
    return null; // Or display a loading spinner if you prefer
  }

  return (
    <button
      onClick={navigateToHome} // Trigger navigation on click
      className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      Go to Home
    </button>
  );
};

export default ButtonHome;
