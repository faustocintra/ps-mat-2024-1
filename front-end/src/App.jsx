import React from 'react'
import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import {ThemeProvider} from '@mui/material/styles';
import theme from './ui/theme';
import TopBar from './ui/TopBar'
import { CssBaseline } from '@mui/material';
import FooterBar from './ui/FooterBar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Box from '@mui/material/Box'
import AuthUserContext from './contexts/AuthUserContext';

function App() {
//armazena globalmente as informaçoes de usuario autenticado
  const [authUser, setAuthUser] = React.useState(null)

  



  return (
    <>
    <ThemeProvider theme = {theme}>
    <BrowserRouter>
    <CssBaseline />
    <AuthUserContext.Provider value={{authUser, setAuthUser}}>
    <TopBar />
    <Box sx={{ margin: '24px 24px 72px 24px'}}> 
    <AppRoutes />
    </Box>
    <FooterBar />
    </AuthUserContext.Provider>
    </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
