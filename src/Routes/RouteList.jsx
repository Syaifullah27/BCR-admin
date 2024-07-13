import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage/Index";
import LoginPage from "../Pages/LoginPage/Index";
import ProtectedPage from "./ProtectedPage";
import AddCarPage from "../Pages/AddCar/Index";
import EditCarPage from "../Pages/EditCar/Index";
import CarPage from "../Pages/Car/Index";
import TestPage from "../Pages/Test/Index";

export const RouteList = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedPage>
                <DashboardPage />
            </ProtectedPage>
        ),
    },
    {
        path: "/car",
        element: (
            <ProtectedPage>
                <CarPage />
            </ProtectedPage>
        ),
    },
    {
        path: "/add-car",
        element: (
            <ProtectedPage>
                <AddCarPage />
            </ProtectedPage>
        ),
    },
    {
        path: "/edit-car/:id",
        element: (
            <ProtectedPage>
                <EditCarPage />
            </ProtectedPage>
        ),
    }, 
    {
        path: "/test",
        element: <TestPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
])