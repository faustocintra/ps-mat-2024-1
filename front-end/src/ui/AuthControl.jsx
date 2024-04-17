import React from "react";
import { Typography, Button } from "@mui/material";
import AuthUSerContext from "../Contexts/AuthUserContext";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

export default function AuthControl() {
    const { authUser, setAuthUser } = React.useContext(AuthUSerContext)

    const navigate = useNavigate()

    function handleLogoutButtonClick() {
        if (window.confirm('Deseja realmente sair?')) {


            //Apaga o Token do LocalStorage
            window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME)

            //Apaga as informações de memoria do usuario autenticado
            setAuthUser(null)

            // sera redirecionado para a pagina de login
            navigate('/login')
        }
    }

    if (authUser) {
        return (
            <>
                <AccountCircleIcon sx={{ mr: 1 }} />
                <Typography variant="caption" fontSize={16}>
                    {authUser.fullname}
                </Typography>
                <Button
                    color="secondary"
                    size="small"
                    onClick={handleLogoutButtonClick}
                    sx={{
                        ml: 0.75, // ml: marginLeft
                    }}>
                    Sair
                </Button>
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

