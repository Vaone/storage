import {createBrowserRouter, Navigate, Outlet,  RouterProvider} from "react-router-dom";
import Registration from "../components/registration/Registration.jsx";
import Login from "../components/authorization/Login.jsx";
import React from "react";
import Profile from "../components/profile/Profile.jsx";
import Disk from "../components/disk/Disk.jsx";
import {Layout} from "../components/layout/Layout.jsx";

const isAuth = true
const PrivateRoutes = () => {
    return isAuth ? <Outlet /> : <Navigate to={"/login"} />
}

const PublicRoutes = () => {
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

export const router = createBrowserRouter([
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