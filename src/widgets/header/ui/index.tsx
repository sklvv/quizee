import { useAppSelector } from "@/shared/lib/hooks";
import { Outlet, useLocation } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./Logo/Logo";
import UserActions from "./HeaderActions/UserActions";
import CreatorActions from "./HeaderActions/CreatorActions";
import Layout from "@/shared/ui/layout";

const Header = () => {
  const { email } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const isInCreator = pathname.includes("creator");
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo />
          {email && !isInCreator && <UserActions />}
          {isInCreator && <CreatorActions />}
        </Toolbar>
      </AppBar>
      {isInCreator ? <Outlet /> : <Layout />}
    </>
  );
};

export default Header;
