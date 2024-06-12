import Typography  from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import useWaiting from '../ui/useWaiting'
import Paper from '@mui/material/Paper'
import myfetch from '../lib/myfetch'
import useNotification from '../ui/useNotification';
import { Container } from '@mui/material';

export default function AboutKarangos(){

  // Variavel de estado que recebe as informações sobre o projeto Karangos
  const [state, setState] = React.useState({
    infoKarangos: [`info: Karangos é um projeto desenvolvido pelo Prof. Fausto Cintra juntamente os alunos do 5º semestre matutino 
                    de ADS da Fatec Franca. Seu objetivo é demonstrar as funcionalidades e possibilidades do React em conjunto com 
                    a biblioteca de componentes Material UI, acessando uma API REST desenvolvida com Node.js e Express.
                    Clique sobre ícone do menu no canto superior esquerdo para acessar as funcionalidades.`]
  })
  const {
    infoKarangos
  } = state

  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()

  React.useEffect(() => {
    fetchData()
  }, [])

  // Função para buscar valores na variável de estado
  async function fetchData() {
    // Exibe a tela de espera
    showWaiting()
    try {
      const result = await myfetch.get('/about')
      
      // Coloca o resultado no vetor infoKarangos
      setState({ ...state, infoKarangos: result })
    }
    catch(error) {
      console.error(error)
      notify('ERRO: ' + error.message, 'error')
    }
    finally {
      // Oculta a tela de espera
      showWaiting(false)
    }
  }

  return (
    <>
        <Waiting />
        <Container> 

        <Typography variant='h1' color='secondary.light' gutterBottom> 
            Sobre o projeto Karangos 
        </Typography>

      
        <Paper elevation={20} sx={{ width:1000, justifyContent:'center'}} >
        {infoKarangos}
        </Paper>     
      </Container>
    </>
  )
}
