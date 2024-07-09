import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage/Index";
import LoginPage from "../Pages/LoginPage/Index";
import ProtectedPage from "./ProtectedPage";
import AddCarPage from "../Pages/AddCar/Index";
import EditCarPage from "../context/EditCar/Index";
// import DeleteCarPage from "../DeleteCar/Index";

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
        path: "/add-car",
        element: (
            <ProtectedPage>
                <AddCarPage />
            </ProtectedPage>
        ),
    },
    {
        path: "/edit-car",
        element: (
            <ProtectedPage>
                <EditCarPage />
            </ProtectedPage>
        ),
    }, 
    {
        path: "/login",
        element: <LoginPage />,
    },
])