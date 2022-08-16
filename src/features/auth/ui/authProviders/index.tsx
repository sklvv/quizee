import { Button, Typography } from "@mui/material";
import { useAppDispatch } from "@/shared/lib/hooks";

import { logInPopup } from "../..";

const AuthProviders = () => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    dispatch(logInPopup());
  };
  return (
    <Button variant="outlined" sx={{ mt: "16px" }} onClick={handleClick}>
      <Typography variant="button">Continue with Google</Typography>
    </Button>
  );
};

export default AuthProviders;
