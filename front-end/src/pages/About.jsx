import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import myfetch from '../lib/myfetch'
import Paper from '@mui/material/Paper'
import useWaiting from '../ui/useWaiting'

export default function About() {

  //variavel de estado que contém as informações
    const [state, setState] = React.useState({
        information:[]
      })
    
      const {
        information
      } = state
     
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

        try { //Não consegui obter os dados pelo myfetch e a rota abaixo
          // const result =  await myfetch.get('https://api.faustocintra.com.br/about/1')
          const result = {
            "id": "1",
            "info": "Karangos é um projeto desenvolvido pelo Prof. Fausto Cintra juntamente os alunos do 5º semestre matutino de ADS da Fatec Franca. Seu objetivo é demonstrar as funcionalidades e possibilidades do React em conjunto com a biblioteca de componentes Material UI, acessando uma API REST desenvolvida com Node.js e Express. Clique sobre ícone do menu no canto superior esquerdo para acessar as funcionalidades."
          }
          console.log(result)
          setState({
            ...state,
            information: result
            
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

      //Criando um componente para exibir os Dados do fetchData()
      function Data(){
        return(
          <>
            <div>{information.info}</div>
          </>
        )
      }

      //mostrando dados
    return (
      <>
      <Waiting />
      <Typography variant="h1" gutterBottom>
        Sobre o projeto Karangos
      </Typography>
      <Paper elevation={10}>
        <Box sx={{ height: 200, width: '100%', }}>
         <Data/>
        </Box>
      </Paper>
    </>
    )
  }