"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/client";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axiosInstance.get("/banner");

        if (response.data && response.data.data && response.data.data.length > 0) {
          setBannerData(response.data.data);
        } else {
          setError("No banner data available.");
        }
      } catch (err) {
        setError("Failed to load banner data.");
        console.log("Error fetching banner data:", err.response ? err.response.data : err);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  if (loading) {
    return <div className="text-xl text-center">Loading banner...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (bannerData.length === 0) {
    return <div className="text-xl text-center">No banner data available.</div>;
  }

  return (
    <div className="space-y-8">
      {bannerData.map((banner) => {
        const imageUrl = banner.imageUrl || "/default-banner.jpg";

        return (
          <div
            key={banner.id}
            className="relative flex items-center justify-center text-white bg-center bg-cover h-96"
            style={{ backgroundImage: `url(${imageUrl})` }}
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
