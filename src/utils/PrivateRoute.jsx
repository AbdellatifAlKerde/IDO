import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = Cookies.get("user-token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/Unauthorized" />;
}

export default PrivateRoute;
