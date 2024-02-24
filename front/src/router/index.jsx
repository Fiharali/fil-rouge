import { createBrowserRouter } from "react-router-dom";
import Login from "./../Auth/Login";
import Register from "./../Auth/Register";
import DefaultLayout from "../layouts/DefaultLayout";
// import NavbarCustom from "../layouts/NavbarCustom";
// import Sidebar from "../layouts/Sidebar";
// import NavbarCustom from "../layouts/NavbarCustom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />
    },
    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/register',
        element: <Register />
    },

    {
        path: '*',
        element: 'Not Found'
    },
])