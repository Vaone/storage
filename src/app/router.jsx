import {createBrowserRouter, Navigate, Outlet,  RouterProvider} from "react-router-dom";
import Registration from "../components/registration/Registration.jsx";
import Login from "../components/authorization/Login.jsx";
import Profile from "../components/profile/Profile.jsx";
import Disk from "../components/disk/Disk.jsx";
import {Layout} from "../components/layout/Layout.jsx";
import {useSelector} from "react-redux";

const PrivateRoutes = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return isAuth ? <Outlet /> : <Navigate to={"/login"} />
}

const PublicRoutes = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return isAuth ? <Navigate to={'/'} /> : <Outlet />
}

const publicRoutes = [
    {
        element: <Registration />,
        path: "/registration"
    },
    {
        element: <Login />,
        path: "/login"
    },
]
const privateRoutes = [
    {
        element: <Disk />,
        path: "/"
    },
    {
        element: <Profile />,
        path: "/profile"
    },

]

const router = createBrowserRouter([
    {
        children: [
            {
                children: privateRoutes,
                element: <PrivateRoutes/>,
            },
            {
                children: publicRoutes,
                element: <PublicRoutes/>,
            },
        ],
        element: <Layout />,
        errorElement: <div>Error</div>,
        path: '/'
    },
])

export const Router = () => {
    return <RouterProvider router={router} />
}