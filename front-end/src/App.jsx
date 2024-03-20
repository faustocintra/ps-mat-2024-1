import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppBar from './UI/TopBar';
import './App.css'
import TopBar from './UI/TopBar';
import {ThemeProvider} from '@mui/material/styles'
import theme from './UI/theme'
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <TopBar></TopBar>
    </ThemeProvider>
    </>
  )
}

export default App
