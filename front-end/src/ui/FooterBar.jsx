import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SportsBarIcon from '@mui/icons-material/SportsBar';

export default function FooterBar(){
    return(
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
            sx={{
                '& a': {
                    color: 'secondary.light'
                }
            }}
            >
                Desenvolvido com <SportsBarIcon fontSize="large"/> por <a
                href="mailto:weverson.silva2@fatec.sp.gov.br">Aluno: Weverson Silva</a>, 2024.
            </Typography>
        </Toolbar>
    )
}