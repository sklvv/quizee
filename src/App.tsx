import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./hooks";
import { darkTheme, theme } from "./lib/theme";
import AuthPage from "./pages/AuthPage";
import LibraryPage from "./pages/LibraryPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/api/firebase";
import { userPersistence } from "./store/userSlice";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
function App() {
  const { isDarkTheme } = useAppSelector((state) => state.theme);
  const { isLoading, email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!email) {
      if (user) {
        dispatch(userPersistence(user.uid));
      }
    }
  }, [user]);

  if (isLoading || loading) {
    return <>loading</>;
  }
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <LibraryPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
