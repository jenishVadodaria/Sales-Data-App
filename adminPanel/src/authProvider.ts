import { AuthBindings } from "@refinedev/core";
// import { axiosInstance } from "@refinedev/simple-rest";
import jwtDecode from "jwt-decode";
import axios from "axios";
const axiosInstance = axios.create();
export const TOKEN_KEY = "refine-auth";

const getTokenFromLocalStorage = () => localStorage.getItem("refine-auth");
const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;


export const authProvider: AuthBindings = {
  
  register: async ({ name, email, password, role, following }) => {
    try {
      const token = getTokenFromLocalStorage();
      const data = await axiosInstance.post( API_URL + `/auth/register`, {
          name,
          email,
          password,
          role,
          following,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add more headers if needed
          },
        }
      );

      if (data.status === 201) {
        return {
          success: true,
          x: "type",
          // redirectTo: "/",
        };
      } else {
        return {
          success: false,
          // redirectTo: "/",
        };
      }
    } catch (error) {
      console.log(error, "error");

      return {
        success: false,
        error: {
          name: "RegisterError",
          message: "Something went wrong",
        },
      };
    }
  },

  login: async ({ email, password }) => {
    try {
      const { data } = await axiosInstance.post(
        API_URL + 
        `/auth/login`,
        {
          email,
          password,
        }
      );

      if (data) {
        localStorage.setItem(TOKEN_KEY, data.data.accessToken);
        localStorage.setItem("userId", data.data._id);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;

        let userRole;
        const token = getTokenFromLocalStorage();
        if (token) {
          const decodedToken: any = jwtDecode(token);
          userRole = decodedToken?.role;
        }
        console.log(userRole, "++auth");

        return {
          success: true,
          // redirectTo: "/register",
          redirectTo: `${
            userRole === "qa"
              ? "/v1/companies/all"
              : userRole === "research_analyst"
              ? "/companies/all"
              : "/users/list"
          }`,
        };
      } else {
        return {
          success: false,
          error: {
            name: "Login Error",
            message: "Invalid email or password",
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid email or password",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("userId");

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // axiosInstance.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${token}`;
      return {
        authenticated: true,
        redirectTo: "/users/list",
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  getPermissions: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      const decodedToken: any = jwtDecode(token);

      return {
        role: decodedToken?.role,
      };
    }
    return null;
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const id = localStorage.getItem("userId");

    if (token) {
      const decodedToken: any = jwtDecode(token);

      return {
        id: decodedToken?._id,
        name: "John Doe",
        role: decodedToken?.role,
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    if (error.statusCode === 401 || error.statusCode === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
};
