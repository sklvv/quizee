import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./hooks";
import { darkTheme, theme } from "./lib/theme";
import AuthPage from "./pages/AuthPage";
import LibraryPage from "./pages/LibraryPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/api/firebase";
import { userPersistence } from "./store/userSlice";
import PrivateRoute from "./components/PrivateRoute";

import Loader from "./components/Loader";
import DiscoverPage from "./pages/DiscoverPage";
import ProfilePage from "./pages/ProfilePage";
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
            <Route
              path="/discover"
              element={
                <PrivateRoute>
                  <DiscoverPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
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
