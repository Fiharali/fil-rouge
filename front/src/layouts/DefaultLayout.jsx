/* eslint-disable no-unused-vars */
import React from 'react'
import NavbarCustom from './NavbarCustom'
import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'

export default function DefaultLayout() {
    return (
        <>
            <NavbarCustom />
            <div className='container mx-auto px-5' >
                <Outlet />
            </div>

        </>
    )
}
