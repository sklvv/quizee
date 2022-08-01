import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleTheme } from "../../store/themeSlice";
import { logOut } from "../../store/userSlice";

import Layout from "../Layout";
import { styles } from "./styles";

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
        <Toolbar>
          <Typography sx={styles.title}>Quizee!</Typography>
          {email && (
            <Typography sx={styles.title} onClick={handleClick}>
              Log out!
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Layout />
    </>
  );
};

export default Header;
