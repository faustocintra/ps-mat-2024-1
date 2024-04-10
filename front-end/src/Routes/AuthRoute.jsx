import React from "react";
import { Route, useNavigate } from 'react-router-dom'
import myfetch from "../lib/myfetch";

export default async function AuthRoute({props}) {
    const navigate = useNavigate()

    try {
        //Verificar se o usuário AINDA está autenticado
        const user = await myfetch.get('/users/me')
        //Usuário está autenticado, segue a vida, retorna a roa normal
        return <Route {...props} />
    }
    catch(error) {
        //Deu erro: o usuário não está mais logado. Redirecionamos para login
        console.error(error)
        navigate('/login')
    }
}