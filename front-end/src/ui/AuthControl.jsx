import React from "react";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import AuthUserContext from "../contexts/AuthUserContext";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function AuthControl() {
    const { authUser } = React.useContext(AuthUserContext)
    const navigate = useNavigate()

    if(authUser) {
        return (
            <>
                <AccountCircleIcon color="secondary" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="caption">
                    {authUser.fullname} 
                    <Button color="secondary">Sair</Button>
                </Typography>
            </>
        )
    }
    else {
        return (
            <Link to="/login">
                <Button color="secondary">Entrar</Button>
            </Link>
        )
    }
}