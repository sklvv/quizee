import { Divider, Typography } from "@mui/material";

const AuthDivider = () => {
  return (
    <>
      <Divider sx={{ width: "45%" }} />
      <Typography color="text.secondary" variant="subtitle1">
        or
      </Typography>
      <Divider sx={{ width: "45%" }} />
    </>
  );
};

export default AuthDivider;
