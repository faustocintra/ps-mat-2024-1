import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../ui/pages/HomePage'
import LoginPage from '../ui/pages/LoginPage'

import CustomerList from '../ui/pages/Customer/CustomerList'

/*
    AuthRoute verifica se o usuário ainda está autenticado
    quando não há uma mudança de rotas no front-end
*/

import AuthRoute from './AuthRoute'


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <AuthRoute><HomePage /></AuthRoute> } />
            <Route path="/login" element={ <LoginPage /> } />

            <Route path="/customers" element={ <AuthRoute> <CustomerList/> </AuthRoute>} /> 
        </Routes>
    )
}