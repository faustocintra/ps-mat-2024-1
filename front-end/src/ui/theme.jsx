import { createTheme } from '@mui/material/styles'
import { yellow, pink } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'dark',           //vamos usar modo escuro
        primary: {              //cor primária
            main: yellow[500]
        },
        secondary: {            //cor secundária
            main: pink[500]
        }
    },
    typography: {
        h1: {
            fontSize: '30pt',
            fontWeight: 'bold'
        }
    }
})

export default theme