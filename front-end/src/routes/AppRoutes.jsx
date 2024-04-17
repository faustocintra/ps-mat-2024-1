import React from "react";
import {Routes, Route} from 'react-router-dom'

import HomePage from "../ui/pages/homepage";
import LoginPage from "../ui/pages/loginpage";
import CustomerList from "../ui/pages/customer/CustomerList";
/*
  AuthRoute verifica se o usuário ainda está autenticado
  quando há uma mundança de rota no front-end
*/
import AuthRoute from './AuthRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <AuthRoute><HomePage /></AuthRoute> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/customers" element ={ <AuthRoute><CustomerList/></AuthRoute>} />

    
    </Routes>
  )
}