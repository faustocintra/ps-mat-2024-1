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
},
typography: {
    h1:{
        fontSize: '30pt',
        fontWeight: 'bold'
}
}

})

export default theme