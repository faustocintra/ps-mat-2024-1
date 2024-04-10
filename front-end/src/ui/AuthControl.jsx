import React from "react";
import { Typography, Button } from "@mui/material";
import AuthUSerContext from "../Contexts/AuthUserContext";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AuthControl() {
    const { authUser } = React.useContext(AuthUSerContext)

    if (authUser) {
        return (
            <>
                <AccountCircleIcon sx={{ mr: 1}}/> 
                <Typography variant="caption" fontSize={16}>
                    {authUser.fullname}
                </Typography>
                <Button color="secondary">Sair</Button>
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

