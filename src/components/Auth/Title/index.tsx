import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const AuthTitle = () => {
  const { pathname } = useLocation();

  const isLogin = pathname === "/login";
  return (
    <Typography variant="h6" color="text.primary">
      {isLogin ? "Login" : "Create an account"}
    </Typography>
  );
};

export default AuthTitle;
