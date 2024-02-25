/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Login from "./../Auth/Login";
import Register from "./../Auth/Register";
import DefaultLayout from "./../layouts/DefaultLayout";
import Sidebar from "./../layouts/Sidebar";
import Test from "./../layouts/Test";
import Home from "./../pages/Home";
// import NavbarCustom from "../layouts/NavbarCustom";
// import Sidebar from "../layouts/Sidebar";
// import NavbarCustom from "../layouts/NavbarCustom";

export const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/',
                element: <Home />

            },
        ]
    },

    {
        path: '/login',
        element: <Login />
    },



    {
        path: '*',
        element: 'Not Found'
    },

])