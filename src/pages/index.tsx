import { getInfoAboutQuizee } from "@/features/manageQuizee";
import { createBrowserRouter } from "react-router-dom";
import CreatePage from "./CreatePage";
import ErrorPage from "./ErrorPage";
import ManagePage from "./ManagePage";
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
    {
        path: "/manage",
        element: <ManagePage />,
        errorElement: <ErrorPage />,

        children: [
            {
                path: ":id",
                element: <ManagePage />,
                errorElement: <ErrorPage />,
                loader: async ({ params }) => {
                    const res = await getInfoAboutQuizee(params.id!);
                    console.log(res)
                    return res
                },
            },
        ],
    },
]);

export default router;
