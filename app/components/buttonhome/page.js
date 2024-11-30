"use client";

import React from "react";

const ButtonHome = () => {
  const navigateToHome = () => {
    window.location.href = "/";
  };

  return (
    <button onClick={navigateToHome} className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
      Go to Home
    </button>
  );
};

export default ButtonHome;
