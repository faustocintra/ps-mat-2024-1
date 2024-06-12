import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useNotification from '../ui/useNotification'
import useWaiting from '../ui/useWaiting'

const About = () => {

  //variavel de estado para a info vinda da api externa do professor
  const [about, setAbout] = useState({ id: null, info: '' })

  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()


  /*
    useEffect() com vetor de dependencias vazio para ser executado apenas uma vez no carregamento
  */
  useEffect(() => {
    fetchData()
  }, [])


  //Funcao que vai buscar os dados na api
  const fetchData = async () => {
    showWaiting(true);
    try {
      //Usando o fetch para fazer a requisicao na api
      //Uma abordagem melhor seria a criacao de uma variavel no .env para proteger o endereco da api
      const response = await fetch(`https://api.faustocintra.com.br/about/1`)
      //convertendo a resposta para json
      const result = await response.json()
      setAbout(result)
      notify(`Sobre carregado com sucesso.`)

    } catch (error) {
      console.error(error)
      notify(`Erro: ${error}`, 'error')
    } finally {
      showWaiting(false)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Waiting />
        <Notification />
        <Typography variant='h1' gutterBottom>
          Sobre o projeto Karangos
        </Typography>
        <Paper elevation={3} sx={{ textAlign: 'justify', p: 5}}>
          {about.info}
        </Paper>
      </Box>
    </>
  )
}

export default About