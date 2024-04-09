import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../ui/pages/HomePage'
import LoginPage from '../ui/pages/LoginPage'


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/login" element={ <LoginPage /> } />
        </Routes>
    )
}