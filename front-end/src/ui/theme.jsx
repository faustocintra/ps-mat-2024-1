import { createTheme } from "@mui/material/styles";
import { yellow, pink } from "@mui/material/colors";

const theme = createTheme ({
    palette: {
        mode: 'dark',            // Vamos usar o modo escuro
        primary: {               // Cor primária
            main: yellow[500]
        },
        secondary: {
            main: pink[500]      // Cor secundária
        }
    }
})

export default theme