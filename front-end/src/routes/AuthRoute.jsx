import React from 'react'
import { Navigate } from 'react-router-dom'
import myfetch from '../lib/myfetch'
import AuthUSerContext from '../Contexts/AuthUserContext'

export default function AuthRoute({ children }) {

    async function checkAuthUser() {
        try {
            await myfetch.get('/users/me')
            return true
        }
        catch (error) {
            console.log(error)

            const  {setAuthuser} = React.useContext(AuthUSerContext)
            //apaga as informações do ussuario logado no contexto
            setAuthuser(null)

            
            return false
        }
    }

    if (checkAuthUser()) return children
    else return <Navigate to="/login" />

}