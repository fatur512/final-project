"use client";
import { useState } from "react";
import axiosInstance from "../utils/client"; // Your axios instance

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(""); // Reset success message on submit

    // Validate passwords match
    if (formData.password !== formData.passwordRepeat) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Send the registration request to the API
      const response = await axiosInstance.post("/register", formData);
      console.log("Registration Success:", response.data);
      setLoading(false);
      setSuccessMessage("Registration successful! Redirecting to login..."); // Set success message

      // Redirect to login page after 2 seconds using window.location
      setTimeout(() => {
        window.location.href = "/login"; // Navigate to the login page
      }, 2000); // 2-second delay for the success message
    } catch (err) {
      console.log("Registration Error:", err.response?.data || err);
      // If the email already exists, show an error and redirect to login page
      if (err.response?.data?.error === "Email already registered") {
        setError("Email already registered. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login"; // Redirect to login after a short delay
        }, 2000);
      } else {
        setError(err.response?.data?.error || "An error occurred");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md sm:w-96">
        <h1 className="mb-6 text-2xl font-semibold text-center text-gray-700">Register</h1>

        {/* Show success message */}
        {successMessage && <p className="mb-4 text-center text-green-500">{successMessage}</p>}

        {/* Show error message */}
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="passwordRepeat">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="role">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;