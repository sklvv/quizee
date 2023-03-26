import { createBrowserRouter } from "react-router-dom";
import CreatePage from "./CreatePage";
import ErrorPage from "./ErrorPage";
import ReviewPage from "./ReviewPage";
import WelcomePage from "./WelcomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/review",
    element: <ReviewPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
