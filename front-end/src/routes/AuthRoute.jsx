import React from 'react'
import { Navigate } from 'react-router-dom'
import myfetch from '../lib/myfetch'

export default function AuthRoute({ children }) {

    async function checkAuthUser() {
        try {
            await myfetch.get('/users/me')
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    if (checkAuthUser()) return children
    else return <Navigate to="/login" />

}