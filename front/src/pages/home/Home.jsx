import React, { useEffect } from 'react'
import { isAuth } from '../../roles/isAuth'
import { useNavigate } from 'react-router-dom'

export default function Home() {




    const navigate = useNavigate()
    useEffect(() => {
        !isAuth() && navigate('/login')
    }, [])
    return (
        <div className=''>
            home
        </div>
    )
}
