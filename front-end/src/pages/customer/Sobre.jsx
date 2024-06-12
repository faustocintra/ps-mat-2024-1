import React from "react"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid, GridDeleteForeverIcon } from '@mui/x-data-grid'
import myfetch from "../../lib/myfetch"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import {Await, Link} from "react-router-dom"
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'

export default function Sobre() {

  const [info, setInfo] = React.useState("")
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()


  React.useEffect(() => {
    carregarapi()
  }, [])

  /* A async function (carregaapi),exibe uma tela de carregamento enquanto carrega a api que contem a info, onde data pega a info da api onde converte
  ela para json, gerando o texto.json que por sua vez é armazenado na variavel info.
  Temos tambem o catch para erros que exibe uma notificação se por algum acaso a api não estiver disponivel.
  caso nao aconteça nenhum erro, para de exibir a tela de carregamento e é exibido texto dentro de uma box abaixo do titulo: 
  Projeto Karangos
  */
  
  async function carregarapi() {
    try {
    showWaiting(true)
      const texto = await fetch('https://api.faustocintra.com.br/about/1')
      const data = await texto.json()
      setInfo(data.info) 
    }
    catch(erro) {
      console.error(erro)
      notify(erro.message, 'error') 
    }
    finally {
     showWaiting(false)
    }
  }

  return (
    <>
      <Waiting /> 
      <Notification />
      <Typography variant="h1" gutterBottom>
        Projeto Karangos:
      </Typography>
      <Box sx={{ mt: 2 }}> 
        <Paper elevation={10} sx={{ p: 2 }}> 
          <Typography variant="body1">{info}</Typography>
        </Paper>
      </Box>
    </>
  )
}
