import { createTheme } from '@mui/material/styles'
import { yellow, pink } from '@mui/material/colors'

const theme = createTheme ({
    palette: {
        mode: 'dark',    //Vamos usar o modo escuro
        primary: {        // cor primária
            main: yellow[500]
        },
        secondary: {        // cor secundária
            main: pink[500]
        }
    }
})

export default theme