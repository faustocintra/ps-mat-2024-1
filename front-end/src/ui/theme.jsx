import { createTheme } from '@mui/material/styles'
import { yellow, pink } from '@mui/material/colors'
import { ptBR as ptrBR_datagrid} from '@mui/x-data-grid/locales'
import { ptBR as ptBR_datePicker} from '@mui/x-date-pickers/locales'

const theme = createTheme({
  palette: {
    mode: 'dark',       // Vamos usar o modo escuro
    primary: {          // Cor primária
      main: yellow[500]
    },
    secondary: {        // Cor secundária
      main: pink[500]
    }
  },
  typography: {
    h1: {
      fontSize: '30pt',
      fontWeight: 'bold'
    }
  }
}, ptrBR_datagrid, ptBR_datePicker)

export default theme