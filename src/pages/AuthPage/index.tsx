import { Box, Button } from "@mui/material";
import {
  AuthTitle,
  AuthForm,
  AuthDivider,
  AuthSubtitle,
} from "../../components/Auth";
import { styles } from "./styles";

const AuthPage = () => {
  return (
    <Box sx={styles.authContainer}>
      <AuthTitle />
      <AuthForm />
      <Box sx={styles.divider}>
        <AuthDivider />
      </Box>
      <Button variant="outlined" sx={{ mt: "16px" }}>
        Continue with Google
      </Button>
      <Box sx={{ mt: "56px" }}>
        <AuthSubtitle />
      </Box>
    </Box>
  );
};

export default AuthPage;
