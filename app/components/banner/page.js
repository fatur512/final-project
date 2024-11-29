import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/client"; // Assuming your axiosInstance is in this path

const Banner = () => {
  const [bannerData, setBannerData] = useState([]); // State for storing banner data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state to hold actual error messages

  // Fetch banner data from the API
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axiosInstance.get("/banner");
        // Log the response to check its structure
        console.log("API Response:", response);

        // Check if response is valid and contains data
        if (response.data && response.data.data && response.data.data.length > 0) {
          setBannerData(response.data.data); // Set banner data
        } else {
          setError("No banner data available.");
        }
      } catch (err) {
        // Handle error and log more details for debugging
        setError("Failed to load banner data.");
        console.log("Error fetching banner data:", err.response ? err.response.data : err); // Log full error for debugging
      } finally {
        setLoading(false); // Stop loading state after fetching
      }
    };

    fetchBannerData();
  }, []); // Empty dependency array ensures this runs only on mount

  // Display loading message while data is being fetched
  if (loading) {
    return <div className="text-xl text-center">Loading banner...</div>;
  }

  // Show error message if there's an issue fetching the banner data
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Show a fallback if there's no banner data
  if (bannerData.length === 0) {
    return <div className="text-xl text-center">No banner data available.</div>;
  }

  return (
    <div className="space-y-8">
      {bannerData.map((banner) => {
        // Check if the image URL is valid; if not, fall back to a default image

        return (
          <div
            key={banner.id}
            className="relative flex items-center justify-center text-white bg-center bg-cover h-96"
            style={{ backgroundImage: `url(${imageUrl})` }} // Apply the background image to the banner
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 px-4 text-center">
              <h1 className="text-4xl font-bold">{banner.name || "Default Banner Title"}</h1>
              <p className="mt-4 text-xl">{banner.description || "Default description text"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
