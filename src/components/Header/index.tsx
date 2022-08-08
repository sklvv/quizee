import { AppBar, Toolbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleTheme } from "../../store/themeSlice";
import { logOut } from "../../store/userSlice";
import Layout from "../Layout";
import Logo from "./Logo";
import UserActions from "./UserActions";

const Header = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const handleClick = async () => {
    await dispatch(logOut());
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo />
          {email && <UserActions />}
        </Toolbar>
      </AppBar>
      <Layout />
    </>
  );
};

export default Header;
