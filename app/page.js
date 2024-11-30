"use client";

import { useState, useEffect } from "react";
import Header from "./components/header/page";
import Card from "./components/card/page";
import Categories from "./components/categories/page";
import { getCart } from "./utils/api";
import Banner from "./components/banner/page";
import Activities from "./components/activities/page";

export default function Home() {
  const [badgeCount, setBadgeCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartDataLength = async () => {
      try {
        const cartData = await getCart();
        setBadgeCount(cartData.data.length);
      } catch (error) {
        setError("Failed to fetch cart data. Please try again.");
        setBadgeCount(0);
        console.log("Error fetching cart data:", error);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCartDataLength();
  }, []);

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
          <Categories />
          <Card setBadgeCount={setBadgeCount} />
        </div>
        <Activities />
      </main>
    </div>
  );
}
