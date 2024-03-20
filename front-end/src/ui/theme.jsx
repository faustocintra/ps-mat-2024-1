import {createTheme} from '@mui/material/styles'
import {yellow, pink} from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'dark', //modo trevoso
        primary: {
            main: yellow[500] //cor primaria
    },
        secondary: {
            main: pink[500] //cor secundaria
        }
}
})

export default theme