import React from "react"; 
import { Route, useNavigate } from 'react-router-dom'

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import myfetch from "../lib/myfetch";

export default async function AuthRoute({...props}) {
    const useNavigate = useNavigate()
    try{
        await myfetch.get('/users/me')

        return <Route {...props} />
    }
    catch(error){
        console.error(error)
        navigate('/login')
    }
}