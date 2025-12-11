import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
}
