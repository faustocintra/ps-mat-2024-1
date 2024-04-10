import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import myfetch from '../lib/myfetch'

const AuthRoute = async ({ ...props }) => {
    const navigate = useNavigate();
    try {
        await myfetch.get('/users/me')
        return <Route {...props} />
    } catch (error) {
        console.error(error)
        navigate('/login')
    }
}

export default AuthRoute