/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Login from "./../Auth/Login";
import DefaultLayout from "./../layouts/DefaultLayout";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import { Users } from "../pages/users/Users";
import UserEdit from "../pages/users/UserEdit";
import Page404 from "../pages/errors/Page404";
import ClassNames from "../pages/classNames/classNames";
import Campuses from "../pages/campuses/Campuses";
import Promotions from "../pages/promotions/Promotions";
import Levels from "../pages/levels/Levels";
import Absences from "../pages/absences/Absences";
import AbsenceRequest from "../pages/absences/AbsenceRequest";
import AbsencesCalendar from "../pages/absences/AbsencesCalendar";
import MyAbsencesCalendar from "../pages/absences/MyAbsencesCalendar";
import MyAbsences from "../pages/absences/MyAbsences";
import AddAbsence from "../pages/absences/AddAbsence";
import { OldUsers } from "../pages/users/OldUsers";
import Page403 from "../pages/errors/Page403";


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
                path: '/old-users',
                element: <OldUsers />

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
            {
                path: '/add-absence',
                element: <AddAbsence />

            },
            {
                path: '/absence-calender',
                element: <AbsencesCalendar />

            },

            {
                path: '/my-absences',
                element: <MyAbsences />

            },

            {
                path: '/my-absence-calender',
                element: <MyAbsencesCalendar />

            },

            {
                path: 'unauthorized',
                element: <Page403 />
            },


        ]
    },

    {
        path: '/login',
        element: <Login />
    },



])