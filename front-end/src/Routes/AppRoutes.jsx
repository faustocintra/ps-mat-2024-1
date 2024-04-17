import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import CustomerList from '../pages/customer/CustomerList'

//AuthRoute verifica se usuário ainda está autenticado quando há mudança de rota no front-end
import AuthRoute from './AuthRoute'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <AuthRoute><HomePage /></AuthRoute> } />
            <Route path="/login" element={ <LoginPage /> } />

            <Route path="/customers" element={ <AuthRoute><CustomerList /></AuthRoute> } />
        </Routes>
    )
}