import { Box } from "@mui/material";
import {
  AuthTitle,
  AuthForm,
  AuthDivider,
  AuthSubtitle,
} from "../../components/Auth";
import AuthProviders from "../../components/Auth/AuthProviders";

import { styles } from "./styles";

const AuthPage = () => {
  return (
    <Box sx={styles.authContainer}>
      <AuthTitle />
      <AuthForm />
      <Box sx={styles.divider}>
        <AuthDivider />
      </Box>
      <AuthProviders />
      <Box sx={{ mt: "56px" }}>
        <AuthSubtitle />
      </Box>
    </Box>
  );
};

export default AuthPage;
