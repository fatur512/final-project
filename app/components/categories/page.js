"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/client";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data.data);
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageError = (e) => {
    e.target.src = "/fallback-image.jpg";
    e.target.onerror = null;
  };

  if (loading) {
    return (
      <div className="text-xl text-center">
        <div className="spinner"></div> Loading categories...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-4 text-2xl font-bold text-left text-gray-900">Categories</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="relative overflow-hidden transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md"
            >
              <div className="h-40 bg-gray-200">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-cover w-full h-full"
                  onError={handleImageError}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">{category.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{category.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
