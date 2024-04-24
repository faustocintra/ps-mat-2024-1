import{createTheme} from '@mui/material/styles'
import{yellow, pink} from '@mui/material/colors'
import { ptBR as ptBR_datagrid } from '@mui/x-data-grid/locales'
import { ptBR as ptBR_datepicker } from '@mui/x-date-pickers/locales'

const theme = createTheme({
    palette: {
        mode: 'dark',           //modo escuro
        primary:{               //cor primaria
            main: yellow[500]
        },
        secondary:{             //cor secundária
            main: pink[500]
        }
    },
        typography : {
            h1:{
                fontSize : '30pt' ,
                fontWeight: 'bold'
            }
        }
}, ptBR_datagrid, ptBR_datepicker)

export default theme