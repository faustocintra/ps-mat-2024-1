import React from "react";
import { Route, useNavigate } from "react-router-dom";
import myfetch from "../lib/myfetch";

export default function AuthRoute({:...props}) {
    const navigate = useNavigate()
    try {
        //Verifica se o usuário AINDA está autenticado
        await myfetch.get('/users/me')
        //Usuario ainda esta autenticado, segue a vida,
        //retorna a rota normal
        
        return <Route {...props} />
    }
    catch(error){

    }
}