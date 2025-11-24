import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("token"); // or your own auth flag

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
