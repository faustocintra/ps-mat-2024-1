import { createTheme } from '@mui/material/styles'
import {yellow, pink, blue, grey, purple, red} from '@mui/material/colors'

const theme = createTheme({
    palette:{
        mode: 'dark',       //Vamos usar o modo escuro
        primary: {          //Cor primaria
            main: yellow[500]
        },
        secondary: {        //Cor secundaria
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
