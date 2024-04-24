import { createTheme } from '@mui/material/styles'
import {yellow, pink, blue, grey, purple, red} from '@mui/material/colors'
import { ptBR as ptBR_datagrid} from '@mui/x-data-grid/locales'
import { ptBR as ptBR_datepicker} from '@mui/x-data-grid/locales'

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
}, ptBR_datagrid, ptBR_datepicker)

export default theme
