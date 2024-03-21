import { Box, Button } from "@mui/material";
import React, { ReactNode } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  // console.log(user, "+++");

  const topHeaderHeight = 60;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box>
      <Box
        height={topHeaderHeight}
        width={"100%"}
        sx={{ backgroundColor: "#1c2239", color: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 25px",
            height: "100%",
          }}
        >
          <Box>
            Hi{" "}
            {user?.name &&
              user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </Box>
          <Box style={{ borderRadius: "1px solid white" }}>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: `calc(100vh - ${topHeaderHeight}px)`,
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "none" }}>sidebar</Box>
        <Box
          sx={{
            flexGrow: 1,
            padding: "0px 50px 30px 50px",
            backgroundColor: "white",
            height: `calc(100vh - ${topHeaderHeight}px)`,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
