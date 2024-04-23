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
import ForgetPassword from "../Auth/ForgetPassWord";
import ResetPassWord from "../Auth/ResetPassWord";
import AddConge from "../pages/conge/AddConge";
import CongeRequest from "../pages/conge/CongeRequest";
import Conges from "../pages/conge/Conges";
import CongesCalendar from "../pages/conge/CongeCalendar";
import MyConges from "../pages/conge/MyConges.jsx";
import MyCongeCalendar from "../pages/conge/MyCongeCalendar.jsx";



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
                path: '/add-conge',
                element: <AddConge />
            },
            {
                path: '/conge-request',
                element: <CongeRequest />
            },
            {
                path: '/conges',
                element: <Conges/>
            },
            {
                path: '/my-conges',
                element: <MyConges/>
            },
            {
                path: '/conges-calendar',
                element: <CongesCalendar/>
            },
            {
                path: '/my-conges-calendar',
                element: <MyCongeCalendar/>
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

    {
        path: '/forget-password',
        element: <ForgetPassword />
    },
    {
        path: '/password-reset/:token',
        element: <ResetPassWord />
    },
    {
        path: '*',
        element: <Page404 />
    },



])