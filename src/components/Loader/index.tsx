import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
