import {createTheme} from '@mui/material/styles'
import {pink, yellow} from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { //cor primaria
            main: yellow[500]
        },
        secondary: { //cor secundaria
            main: pink[500]
        }
    }
})

export default theme