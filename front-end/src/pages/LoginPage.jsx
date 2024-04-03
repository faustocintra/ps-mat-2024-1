import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import myfetch from '../lib/myfetch'
import Notification from '../ui/Notification'
import {useNavigate} from 'react-router-dom'
import Waiting from '../ui/Waiting'

export default function LoginPage() {

  const [state, setState] = React.useState({
    showPassword: false,
    email: '',
    password:'',
    showWaiting: false,
    notif: {
      show: false,
      message: '',
      severity: 'sucess',
      timeout: 1500
    }
  })
  const{
    showPassword,
    email,
    password,
    showWaiting,
    notif
  } = state

  const navigate = useNavigate()

  const handleClickShowPassword = () => setState({...state, showPassword: 
    !showPassword})

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  function handleChange(event){
    setState({...state, [event.target.name]: event.target.value})
  }

  async function handleSubmit (event){
    event.preventDefault()  //evita que a página seja recarregada
    
    try{

      //exibe o backdrop de espera
       setState({...state, showWaiting: true})

        const response = await myfetch.post('/users/login', {email, password})
       // console.log(response)

       // Armazena  o token no localStorage (INSEGURO!! ISSO É PRPVISÓRIO!!)
       window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, response.token)

       // Mostra notificação de sucesso
       setState({...state,
        showWaiting: false,
         notif: {
        show: true,
        message: 'Autenticação efetuada com sucesso',
        severity: 'sucess',
        timeout: 1500
       }})

    }
    catch(error){
        console.error(error)

        setState({...state, 
          showWaiting: false,
          notif: {
          show: true,
          message: error.message,
          severity: 'error',
          timeout: 1500
         }})
    }
  }

function handleNotificationClose(){
  const status = notif.severity

  //Fecha a barra de notificação
  setState({...state, notif: {
    show: false,
    severity: status,
    message: '',
    timeout: 1500
  }})

  //vai para a pagina inicial, caso o login tenha sido feito com sucesso
  if(status ==='sucess') navigate('/')

}

  return (
    <>

    <Waiting show={showWaiting} />
    <Notification
    show={notif.show}
    severity={notif.severity}
    message={notif.message}
    timeout={notif.timeout}
    onClose={handleNotificationClose}
    />
      <Typography variant="h1" sx={{ textAlign: 'center' }} gutterBottom>
        Autentique-se
      </Typography>
      <Paper 
        elevation={6}
        sx={{
          padding: '24px',
          maxWidth: '500px',
          margin: 'auto'
        }}
      >
        <form onSubmit={handleSubmit}>
        <TextField
        name='email'
        value={email}
         label="E-mail" 
         onChange={handleChange}
         variant="filled" 
         fullWidth
         sx={{ mb: '24px' }}
          />
        <TextField
            name='password'
            value={password}
            onChange={handleChange}
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            fullWidth
            sx={{ mb: '24px' }}
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
        <Button 
        variant="contained" 
        type="submit"
        color="secondary"
        fullWidth
        >
                 Enviar
                 </Button>
            </form>
      </Paper>
    </>
  )
}