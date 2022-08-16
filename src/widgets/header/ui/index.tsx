import { AppBar, Toolbar } from "@mui/material";
import { useAppSelector } from "@/shared/lib/hooks";

import Layout from "@/shared/ui/layout";
import Logo from "./logo";
import UserActions from "./userActions";

const Header = () => {
  const { email } = useAppSelector((state) => state.user);

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
