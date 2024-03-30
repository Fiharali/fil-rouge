/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Login from "./../Auth/Login";
import Register from "./../Auth/Register";
import DefaultLayout from "./../layouts/DefaultLayout";
import Sidebar from "./../layouts/Sidebar";
import Test from "./../layouts/Test";
import Home from "./../pages/Home";

import Profile from "../pages/Profile";
import { Users } from "../pages/users/Users";
//import Dashboard from "../pages/dashboard/Dashboard";
import UserEdit from "../pages/users/UserEdit";
import Page404 from "../pages/Page404";
import Campuses from "../pages/campuses/Campuses";
import ClassNames from "../pages/classNames/classNames";
// import Campuses from "../pages/campuses/Campuses";
// import NavbarCustom from "../layouts/NavbarCustom";
// import Sidebar from "../layouts/Sidebar";
// import NavbarCustom from "../layouts/NavbarCustom";

export const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            // {
            //     path: '/register',
            //     element: <Register />
            // },
            {
                path: '/',
                element: <Home />

            },
            {
                path: '/users',
                element: <Users />

            },
            {
                path: '/user/:id',
                element: <UserEdit />

            },

            {
                path: '/profile',
                element: <Profile />

            },

            // {
            //     path: '/dashboard',
            //     element: <Dashboard />

            // },
            {
                path: '/campuses',
                element: <Campuses />

            },
            {
                path: '/class-names',
                element: <ClassNames />

            },

        ]
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
        element: <Page404 />
    },

])