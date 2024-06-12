import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

import CustomerList from '../pages/customer/CustomerList'
import CustomerForm from '../pages/customer/CustomerForm'
import CarList from '../pages/car/CarList'
import CarForm from '../pages/car/CarForm'
import Prova2 from '../pages/Prova2'

/*
  AuthGuard verifica se o usuário ainda está autenticado
  quando há uma mudança de rota no front-end
*/
import AuthGuard from './AuthGuard'

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={ <AuthGuard> <HomePage /> </AuthGuard> } />
      <Route path="/login" element={ <LoginPage /> } />
      
      <Route path="/customers" element={ <AuthGuard> <CustomerList /> </AuthGuard>} />
      <Route path="/customers/new" element={ <AuthGuard> <CustomerForm /> </AuthGuard>} />
      <Route path="/customers/:id" element={ <AuthGuard> <CustomerForm /> </AuthGuard>} />

      <Route path="/cars" element={ <AuthGuard> <CarList /> </AuthGuard> } />
      <Route path="/cars/new" element={ <AuthGuard> <CarForm /> </AuthGuard> } />
      <Route path="/cars/:id" element={ <AuthGuard> <CarForm /> </AuthGuard> } />

      <Route path="/sobre" element={ <AuthGuard> <Prova2 /> </AuthGuard> } />
    </Routes>
  )
}