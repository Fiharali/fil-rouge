/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Login from "./../Auth/Login";
import DefaultLayout from "./../layouts/DefaultLayout";
import Home from "./../pages/Home";
import Profile from "../pages/Profile";
import { Users } from "../pages/users/Users";
import UserEdit from "../pages/users/UserEdit";
import Page404 from "../pages/Page404";
import ClassNames from "../pages/classNames/classNames";
import Campuses from "../pages/campuses/Campuses";
import Promotions from "../pages/promotions/Promotions";
import Levels from "../pages/levels/Levels";
import Absences from "../pages/absences/Absences";
import AbsenceRequest from "../pages/absences/AbsenceRequest";


export const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [

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
            {
                path: '/campuses',
                element: <Campuses />

            },
            {
                path: '/class-names',
                element: <ClassNames />

            },
            {
                path: '/promotions',
                element: <Promotions />

            },
            {
                path: '/levels',
                element: <Levels />

            },
            {
                path: '/absences',
                element: <Absences />

            },
            {
                path: '/demand-absence',
                element: <AbsenceRequest />

            },

        ]
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '*',
        element: <Page404 />
    },

])