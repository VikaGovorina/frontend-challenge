import { createHashRouter } from "react-router-dom";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../components/MainLayout/MainLayout";

export const router = createHashRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/favorites",
                element: <FavoritesPage />,
            },
        ],
    },
]);