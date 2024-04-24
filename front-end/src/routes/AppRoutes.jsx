import React from 'react'
import { Routes, Route } from 'react-router-dom'
 
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
 
import CustomerList from '../pages/Customer/CustomerList'
import CustomerForm from '../pages/Customer/CustomerForm'
 
/*
  AuthRoute verifica se o usuário ainda está autenticado
  quando há uma mundança de rota no front-end
*/
import AuthGuard from './AuthGuard'
 
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <AuthGuard><HomePage /></AuthGuard> } />
      <Route path="/login" element={ <LoginPage /> } />
 
      <Route path="/customers" element={ <AuthGuard> <CustomerList /> </AuthGuard>} />
      <Route path="/customers/new" element={ <AuthGuard> <CustomerForm /> </AuthGuard>} />
      <Route path="/customers/:id" element={ <AuthGuard> <CustomerForm /> </AuthGuard>} />
    </Routes>
  )
}