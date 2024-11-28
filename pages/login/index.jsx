import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import { axiosInstance } from "@/app/api/client"; // Ensure axiosInstance is configured correctly
import "@/app/globals.css";

const Login = () => {
  // State to store email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Initialize the useRouter hook for navigation

  // Login function that sends a POST request to the API
  const login = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Prepare the payload for the login API
      const payload = { email, password };

      // Send POST request to the API
      const response = await axiosInstance.post("/login", payload);

      // Handle success: Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token); // Store the token in localStorage
        console.log("Login successful", response.data);

        // Redirect to the home page ("/") after successful login
        router.push("/"); // This will redirect to the root route ("/")
      }
    } catch (error) {
      // Handle error
      setError("Login failed. Please check your credentials.");
      console.error("Error during login:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto">
      <form onSubmit={login}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Display error message if login failed */}
        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
