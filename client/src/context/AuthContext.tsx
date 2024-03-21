import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { appConstants } from "../utils/app.constants";
import { Box, LinearProgress, Skeleton, Typography } from "@mui/material";

interface User {
  _id: string;
  role: string;
  email: string;
  name: string;
  following: any[];
}

interface AuthContextType {
  user: User | null;
  updateUser: (updatedUser: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (role: string) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}
interface ErrorResponse {
  message: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  isAuthenticated: () => false,
  hasRole: () => false,
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const config = {
        headers: {
          apptype: "user",
        },
      };

      const response = await axios.post(
        `${appConstants.baseApiUrl}/auth/login`,
        {
          email,
          password,
        },
        config
      );

      const { accessToken, _id, name, following } = response.data.data;

      const decodedToken: { role: string } = jwtDecode(accessToken);

      if (response.status === 200) {
        setUser({ _id, email, role: decodedToken.role, name, following });
      } else {
        setUser(null);
      }

      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("selectedCompany");
  };

  const updateUser = (updatedUser: User | null) => {
    setUser(updatedUser);
  };

  const isAuthenticated = () => {
    return user !== null && localStorage.getItem("accessToken") !== null;
  };

  const hasRole = (role: string) => {
    return user !== null && user.role === role;
  };

  const handleAuthError = (error: unknown) => {
    const axiosError = error as AxiosError<ErrorResponse, any>;
    // console.log("Authentication error:", axiosError.response?.data.message);
    throw new Error(axiosError.response?.data.message);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedToken: any = jwtDecode(accessToken);

        const { _id, role }: User = decodedToken;

        const fetchUser = async () => {
          try {
            const response = await axios.get(
              `${appConstants.baseApiUrl}/users/user/${_id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            const { email, name, following } = response.data;

            setUser({ _id, role, email, name, following });
          } catch (error) {
            console.log("Error fetching user information:", error);
            handleAuthError(error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchUser();
      } catch (error) {
        console.log("Invalid access token");
        logout();
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Adjust this to control the centering vertically
        }}
      >
        <Box sx={{ width: "20%", textAlign: "center" }}>
          <Typography variant="h5"> Loading data...</Typography>
          <LinearProgress />
        </Box>
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, hasRole, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
