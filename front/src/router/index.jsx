import { createBrowserRouter } from "react-router-dom";
import Login from "./../Auth/Login";
import Register from "./../Auth/Register"; 

export const router = createBrowserRouter([
    {
        path: '/',
        element: 'home'
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