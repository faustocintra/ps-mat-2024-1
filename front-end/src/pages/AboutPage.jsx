import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useWaiting from '../ui/useWaiting'
import useNotification from '../ui/useNotification'

export default function AboutPage() {

  // Estado para gerenciar os dados buscados
  const [info, setInfo] = useState(null)

  // Estado para gerenciar o estado de carregamento
  const { showWaiting, Waiting } = useWaiting() // Inicializa o hook useWaiting
  const { notify, Notification } = useNotification() // Inicializa o hook useNotification

  // useEffect é chamado para não fazer várias chamadas ao servidor da api
  useEffect(() => {
    // Função assíncrona para buscar dados
    async function fetchData() {
         // Mostra o carregamento
        showWaiting(true)
      try {
        // Optei pelo fetch pelo myfetch estar dando erro
        // Faz uma requisição GET para a API
        const response = await fetch('https://api.faustocintra.com.br/about/1');
        const data = await response.json()
        setInfo(data.info)
      } catch (error) {
        notify(error.message, 'error')
      }
      finally {
        showWaiting(false) // Esconde o indicador de carregamento após a requisição
      }
    }
 
    fetchData(); // Chama a função de busca de dados assim que carregar a página

  }, []);

  return (
    <>
      <Waiting />  {/* Componente para exibir o indicador de carregamento */}
      <Notification /> {/* Componente para exibir notificações */}
      <Typography variant="h1" gutterBottom>
        Sobre o projeto Karangos
      </Typography>
      <Paper elevation={10}>
        <Box p={2}>
          {info ? ( // Verifica se os dados foram carregados ( 
            <Typography variant="body1"> {/* Componente para exibir texto */}
              {info} {/* Exibe os dados */}
            </Typography>
          ) : (
            <Typography variant="body1">
              Carregando... {/* Exibe mensagem de carregamento caso não buscar nenhum dado  */}
            </Typography>
          )}
        </Box>
      </Paper>
    </>
  );

}

