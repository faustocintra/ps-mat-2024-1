import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

import CustomerList from '../pages/customers/CustomerList'
import CustomerForm from '../pages/customers/CustomerForm'

import CarForm from '../pages/cars/CarForm'
import CarList from '../pages/cars/CarList'

import AboutKarangos from '../pages/AboutKarangos'


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

      <Route path="/cars" element={<AuthGuard> <CarList /> </AuthGuard>  } />
      <Route path="/cars/new" element={ <AuthGuard>  <CarForm /> </AuthGuard> } />
      <Route path="/cars/:id" element={ <AuthGuard> <CarForm /> </AuthGuard> } />

      <Route path="/about" element={ <AuthGuard> <AboutKarangos /> </AuthGuard> } />

    </Routes>
  )
}