"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/client";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get("/activities");

        if (Array.isArray(response.data) && response.data.length > 0) {
          setActivities(response.data);
        } else {
          setError("No activities available.");
        }
      } catch (error) {
        setError("Failed to fetch activities. Please try again.");
        console.log("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleActivityClick = (activityId) => {
    window.location.href = `/activity/${activityId}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-semibold">Activities</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
            onClick={() => handleActivityClick(activity.id)}
          >
            <img
              src={activity.imageUrl || "/default-image.jpg"}
              alt={activity.title}
              className="object-cover w-full h-56"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{activity.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{activity.description}</p>
              <div className="mt-4 text-sm font-bold text-gray-800">
                {activity.price ? `Price: ${activity.price}` : "Price: Not Available"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
