import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container
      sx={{
        mt: "8px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </Container>
  );
};

export default Layout;
