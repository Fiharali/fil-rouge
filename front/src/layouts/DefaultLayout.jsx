/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import NavbarCustom from './NavbarCustom'
import { Outlet, useNavigate } from 'react-router-dom'
import { isAuth } from '../roles/isAuth';
// import Sidebar from './Sidebar'

export default function DefaultLayout() {

    const navigate= useNavigate()

    useEffect(() => {
        !isAuth() && navigate('/login')
       
    }, []);
    return (
        <>
            <NavbarCustom />
            <div className='container mx-auto px-5' >
                <Outlet />
            </div>

        </>
    )
}
