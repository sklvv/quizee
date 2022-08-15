import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const AuthSubtitle = () => {
  const { pathname } = useLocation();

  const isLogin = pathname === "/login";
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        {isLogin ? "Don`t have an account? " : "Already have an account? "}
        <NavLink to={isLogin ? "/signup" : "/login"}>
          <Box component={"span"} sx={{ color: "primary.main" }}>
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </NavLink>
      </Typography>
    </>
  );
};

export default AuthSubtitle;
