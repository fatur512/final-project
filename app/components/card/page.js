"use client";
import { useState, useEffect } from "react";
import { getActivities, postCart } from "@/app/utils/api"; // Import the getActivities function
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Import Heroicon v2 ShoppingCart icon

export default function Example({ setBadgeCount }) {
  const [activities, setActivities] = useState([]); // State to store fetched activities
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for handling errors

  // Fetch activities when the component mounts
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities(); // Fetch data from the API
        setActivities(data.data); // Set the activities state
      } catch (error) {
        setError("Failed to load activities");
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchActivities(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs only once on mount

  // If the data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching the data, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Handle adding item to cart
  const handleAddToCart = async (item, event) => {
    event.stopPropagation(); // Prevent event bubbling if any parent elements have click listeners
    console.log(`Adding to cart: ${item.title}`);

    try {
      // Call postCart with the item.id
      await postCart(item.id);

      // If the request is successful, increase the badge count by 1
      setBadgeCount((prevCount) => prevCount + 1);
      console.log("Item successfully added to cart");
    } catch (error) {
      // Handle any errors that occur during the postCart request
      console.log("Failed to add item to cart:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-6 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Product List</h2>

        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {activities.map((item) => (
            <div key={item.id} className="relative group">
              <img
                alt={item.imageUrls.length > 0 ? item.imageUrls[0] : "Default Image"} // Fallback alt text
                src={item.imageUrls.length > 0 && item.imageUrls != "" ? item.imageUrls[0] : "/img/paris.jpg"} // Default image if array is empty
                className="object-cover w-full bg-gray-200 rounded-md aspect-square group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description.slice(0, 20)}...</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">{"★".repeat(Math.min(Math.floor(item.rating), 5))}</span>
                    <span className="ml-2 text-gray-500">({Math.min(item.rating, 5).toFixed(1)})</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-medium text-gray-900">
                    Rp. {new Intl.NumberFormat("id-ID").format(item.price)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={(e) => handleAddToCart(item, e)} // Pass event to handler to stop propagation
                      className="relative z-10 text-blue-500 transition-colors duration-200 hover:text-blue-700" // Ensure button is clickable
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
