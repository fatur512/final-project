"use client";

import { useState, useEffect } from "react";
import Header from "./components/header/page";
import Card from "./components/card/page";
import Categories from "./components/categories/page";
import { getCart } from "./utils/api";
import Banner from "./components/banner/page";
import Activities from "./components/activities/page";

export default function Home() {
  const [badgeCount, setBadgeCount] = useState(0); // Badge count for cart items
  const [loadingCart, setLoadingCart] = useState(true); // Loading state for cart data
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchCartDataLength = async () => {
      try {
        const cartData = await getCart();
        setBadgeCount(cartData.data.length); // Update badge count with cart data length
      } catch (error) {
        setError("Failed to fetch cart data. Please try again.");
        setBadgeCount(0); // Reset badge count if there's an error
        console.error("Error fetching cart data:", error); // Log the error for debugging
      } finally {
        setLoadingCart(false); // Set loading to false once data is fetched
      }
    };

    fetchCartDataLength();
  }, []); // Only run once on component mount

  if (loadingCart) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading cart information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <Header badgeCount={badgeCount} />
      <Banner />
      <main>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Categories /> {/* Categories Section */}
          <Card setBadgeCount={setBadgeCount} />
        </div>
        <Activities />
      </main>
    </div>
  );
}
