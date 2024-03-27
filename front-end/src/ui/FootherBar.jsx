import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CoffeIcon from '@mui/icons-material/Coffee'

export default function FooterBar() {
  return (
    <Toolbar
      variant="dense"
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: 'action.disabledBackground'
      }}
    >
        <Typography variant="caption"
        sx= {{
          '& a': {
            color: 'secondary.light'
          }
        }}
        >
          Desenvolvido com <CoffeIcon fontzise="small" /> por <a
          href="biancakaroliner04@gmail.com">Bianca Karoline Ramos</a>, 2024
        </Typography>
    </Toolbar>
  )
}