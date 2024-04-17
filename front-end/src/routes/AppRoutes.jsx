import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import AuthRoute from './AuthRoute'
import AuthUserContext from '../contexts/AuthUserContext'
import CustomerList from '../pages/customer/CustomerList'

export default function AppRoutes() {
  return (
    <AuthUserContext.Provider value={{ signed: true }}>
      <Routes>
        <Route path="/" element={<AuthRoute>
          <HomePage />
        </AuthRoute>
        } />
        <Route path='/customers' element={
          <AuthRoute>
            <CustomerList/>
          </AuthRoute>
        }/>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthUserContext.Provider>
  )
}