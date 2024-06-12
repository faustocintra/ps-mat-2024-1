import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import myfetch from '../lib/myfetch'
import Paper from '@mui/material/Paper'
import useWaiting from '../ui/useWaiting'
import useNotification from '../ui/useNotification'

export default function AboutList() {

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.',
      type: 'number',
      width: 80 
    },
    {
      field: 'info',
      headerName: 'Informações',
      width: 250,
    },
  ]

  const [state, setState] = React.useState({
    about: []
  })
  const {
    about
  } = state

  const { showWaiting, Waiting } = useWaiting()
  const { notify, Notification } = useNotification()

  /*
    useEffect() com vetor de dependências vazio irá ser executado
    apenas uma vez, durante o carregamento inicial do componente
  */
  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    showWaiting(true)
    try {
      const result = await myfetch.get('/about')
      console.log(result)
      setState({
        ...state,
        about: result
      })
    }
    catch(error) {
      console.error(error)
      notify(error.message, 'error')
    }
    finally {
      showWaiting(false)
    }
  }

  return(
    <>
      <Typography variant="h1" gutterBottom>
        Sobre o projeto Karangos
      </Typography>

      <Paper elevation={10}>
        Karangos é um projeto desenvolvido pelo Prof. Fausto Cintra juntamente os alunos do 5º semestre matutino de ADS da Fatec Franca. Seu objetivo é demonstrar as funcionalidades e possibilidades do React em conjunto com a biblioteca de componentes Material UI, acessando uma API REST desenvolvida com Node.js e Express. Clique sobre ícone do menu no canto superior esquerdo para acessar as funcionalidades.
      </Paper>
    </>
  )
}