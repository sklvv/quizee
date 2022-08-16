import { ThemeProvider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { darkTheme, theme } from "@/shared/config/theme";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/shared/config/";
import { userPersistence } from "@/features/auth";
import Loader from "@/shared/ui/loader";
import Routing from "@/pages";
import { Suspense } from "react";
function App() {
  const { isDarkTheme } = useAppSelector((state) => state.theme);
  const { isLoading, email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [user, loading] = useAuthState(auth);

  if (!email && user && !isLoading) {
    dispatch(userPersistence(user.uid));
  }

  if (loading || isLoading) {
    return <Loader />;
  }
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : theme}>
      <Suspense fallback={<Loader />}>
        <Routing />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
