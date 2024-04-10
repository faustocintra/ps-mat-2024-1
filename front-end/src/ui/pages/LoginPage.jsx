import React from "react";
import { Typography } from "@mui/material";
import { Paper, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Notification from "../Notification";
import {useNavigate} from 'react-router-dom'
import Waiting from "../waiting";
import AuthUSerContext from "../../Contexts/AuthUserContext";

import myfetch from "../../lib/myfetch";

export default function LoginPage() {
    const [state, setState] = React.useState({
        showPassword: false,
        email: '',
        password: '',
        showWaiting: false,
        notif: {
            show: false,
            message: '',
            severity: 'success',
            timeout: 1500
        }
    })
    const {
        showPassword,
        email,
        password,
        showWaiting,
        notif

    } = state

    const{ setAuthUser } = React.useContext(AuthUSerContext)

    const navigate = useNavigate()
    const handleClickShowPassword = () => setState({ ...state, showPassword: !showPassword});

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value })
}

async function handleSubmit(event){
    event.preventDefault()  //evita que a pagina seja recarregada

    try {
        //exibe o backdrop de espera
        setState({...state, showWaiting: true})

        const response = await myfetch.post('/users/login', {email, password})
        //console.log(response)

        //armazena o token no localStorage (Inseguro isso é provisorio)
        window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, response. token)

        // Armazena as informações do usuário autenticado no contexto AuthUserContext
        setAuthUser(response.user)
       
        //Mostra notificação de sucesso
        setState({...state, showWaiting: false, notif: {
            show:true,
            message: 'Autenticação efetuada com sucesso.',
            severity: 'success',
            timeout: 1500
        }})
        //TODO: redirecionar para homePage
    }
    catch(error){
        console.error(error)

        //Mostra a Notificação de erro
        setState({...state, showWaiting: false, notif: {
            show:true,
            message: error.message,
            severity: 'error',
            timeout: 4000
        }})
    }
}
function handleNotificationClose(){
    const status = notif.severity

    //fecha a barra de notificação
    setState({...state, notif: {
        show: false,
        severity: status,
        message: '',
        timeout: 1500

    }})

    //vai para a pagina inicial caso login tenha sido feito com sucesso
    if(status === 'success') navigate('/')

}

return (
    <>
    <Waiting show={showWaiting}/>

    <Notification
        show={notif.show}
        severity={notif.severity}
        message={notif.message}
        timeout={notif.timeout}
        onClose={handleNotificationClose}
        />
        <Typography variant="h1" sx={{ textAlign: 'center' }} gutterBottom>
            identifique-se


        </Typography>

        <Paper elevation={6}

            sx={{
                padding: '24px',
                maxWidth: '500px',
                margin: 'auto'
            }}
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    variant="filled"
                    fullWidth
                    sx={{
                        mb: '24px'
                    }} />

                <TextField
                    name="password"
                    value={password}
                    onChange={handleChange}
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}
                    label="Senha"
                    fullWidth
                    sx={{
                        mb: '24px'
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                <Button variant="contained" type="submit" color="secondary" fullWidth>
                    Enviar
                </Button>
            </form>
            
        </Paper>

    </>
)
}