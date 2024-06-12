import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import myfetch from '../../lib/myfetch'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'

export default function About() {
   
  const [state, setState] = React.useState({
    cars: []
  })
  const {
    cars
  } = state

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()

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
      setState({
        ...state,
        cars: result
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
      Karangos é um projeto desenvolvido pelo Prof. Fausto Cintra juntamente os alunos do 5º semestre matutino de ADS da Fatec Franca. Seu objetivo é demonstrar as funcionalidades e possibilidades do React em conjunto com a biblioteca de componentes Material UI, acessando uma API REST desenvolvida com Node.js e Express. 
      Clique sobre ícone do menu no canto superior esquerdo para acessar as funcionalidades.
      </Paper>
    </>
  )
}

