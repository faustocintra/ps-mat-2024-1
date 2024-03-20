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

function App() {

  return (
    <>
    <ThemeProvider theme = {theme}>
    <CssBaseline />
    <TopBar />
    </ThemeProvider>
    </>
  )
}

export default App
