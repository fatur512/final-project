"use client";

import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/app/api/client"; // Import the axios instance

const Categories = () => {
  const [categories, setCategories] = useState([]); // Array to store all activities
  const [displayedCategories, setDisplayedCategories] = useState([]); // Array to store currently displayed activities
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const activitiesPerLoad = 4;

  // Fetch activities when the component mounts
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
          // Set Authorization header with the token
          axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
        } else {
          // Handle case where token is not found (e.g., redirect to login page)
          console.log("No token found, please login.");
        }

        // Make GET request to /activities endpoint
        const response = await axiosInstance.get("/activities");

        // Log the response data to the console
        console.log("Activities response:", response.data.data);

        // Assuming the response returns an array of activities
        setCategories(response.data.data);
        setDisplayedCategories(response.data.data.slice(0, activitiesPerLoad)); // Display first 4 activities
        setLoaded(true);
      } catch (err) {
        setError("Error fetching activities");
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Handle "Load More" button click
  const loadMoreActivities = () => {
    const nextActivities = categories.slice(displayedCategories.length, displayedCategories.length + activitiesPerLoad);
    setDisplayedCategories((prev) => [...prev, ...nextActivities]);
  };

  // Handle "Show Less" button click
  const loadLessActivities = () => {
    setDisplayedCategories(categories.slice(0, activitiesPerLoad)); // Reset to first 4 activities
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Activities</h1>

      {/* Show loading or error message */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display categories if activities are available */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayedCategories.length > 0 ? (
          displayedCategories.map((activity) => (
            <div
              key={activity.id}
              className="max-w-[10rem] h-[15rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="object-cover w-full h-32 rounded-t-lg"
                  src={activity.imageUrls || "/docs/images/blog/image-1.jpg"}
                  alt={activity.title}
                />
              </a>
              <div className="p-3">
                <a href="#">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {activity.title || "Noteworthy technology acquisitions 2021"}
                  </h5>
                </a>
                <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                  {activity.description ||
                    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div>No activities found</div>
        )}
      </div>

      {/* "Load More" button */}
      {displayedCategories.length < categories.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreActivities}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Load More Activities
          </button>
        </div>
      )}

      {/* "Show Less" button */}
      {displayedCategories.length > activitiesPerLoad && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadLessActivities}
            className="px-6 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Show Less Activities
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;
