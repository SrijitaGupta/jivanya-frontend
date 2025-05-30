import React from "react";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    alert("Please sign up or log in to access the dashboard.");
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;

