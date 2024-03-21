import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ReactNode } from "react";
import { appConstants } from "../utils/app.constants";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, hasRole } = useAuthContext();
  if (!isAuthenticated() || !hasRole(appConstants.userRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};
