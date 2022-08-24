import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "@/widgets/header";
import { PrivateRoute } from "@/shared/lib/hocs";
import AuthPage from "./AuthPage";
import ProfilePage from "./ProfilePage";
import { CreatorPage } from "./CreatorPage";

const LibraryPage = lazy(() => import("./LibraryPage"));
const DiscoverPage = lazy(() => import("./DiscoverPage"));

const Routing = () => {
  return (
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
          <Route path="creator/:quizeeId" element={<CreatorPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
