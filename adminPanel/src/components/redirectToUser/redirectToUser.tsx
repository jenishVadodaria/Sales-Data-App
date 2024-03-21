import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const getTokenFromLocalStorage = () => localStorage.getItem("refine-auth");

const RedirectToUser: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    let userRole;

    if (token) {
      const decodedToken: any = jwtDecode(token);
      userRole = decodedToken?.role;
    }

    const redirectPath = determineRedirectPath(userRole);
    redirectToPath(redirectPath);
  }, []);

  const determineRedirectPath = (role: string | undefined): string => {
    switch (role) {
      case "admin":
        return "/users/list";
      case "qa":
        return "/v1/companies/all";
      case "research_analyst":
        return "/companies/all";
      default:
        return "/";
    }
  };

  const redirectToPath = (path: string) => {
    setIsLoading(false);
    navigate(path);
  };

  return (
    <div>
      {isLoading ? (
        <div>Redirecting...</div>
      ) : (
        <div>Redirected! You should see the new page shortly.</div>
      )}
    </div>
  );
};

export default RedirectToUser;
