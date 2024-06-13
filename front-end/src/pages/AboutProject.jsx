import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import useWaiting from '../ui/useWaiting'

export default function AboutProject() {

  const [about, setAbout] = React.useState(null)

  const { showWaiting, Waiting } = useWaiting()

  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    showWaiting(true)
    try {

      /*

        2. Quando o componente for carregado na página, acesse o endpoint
        https://api.faustocintra.com.br/about/1 e carrege o valor do campo 
        info em uma variável de estado. Exiba a tela de espera enquanto 
        a requisição é feita para o servidor, e desligue-a quando a requisição 
        fo4 concluída com sucesso ou com erro.

        NESSE CASO, COMO O ENDPOINT NÃO FAZ PARTE DO NOSSO BACK-END, FOI NECESSÁRIO
        USAR DIRETAMENTE A FUNÇÃO fetch() DO JAVASCRIPT. UMA ALTERNATIVA SERIA
        ALTERAR O CÓDIGO DA BIBLIOTECA myfetch PARA POSSIBILITAR O ACESSO A ENDPOINTS
        FORA DAQUELES DEFINIDOS NA VARIÁVEL DE AMBIENTE VITE_API_BASE.

      */

      const response = await fetch('https://api.faustocintra.com.br/about/1')
      const data = await response.json()
      
      setAbout(data.info)
      
    }
    catch(error) {
      console.error(error)
    }
    finally {
      showWaiting(false)
    }
  }

  return (
    <>
      <Waiting />

      {/*
        3. Dentro do componente, insira título usando um componente Typography 
          com o texto "Sobre o projeto Karangos".
      */}
      <Typography variant="h1" gutterBottom>
        Sobre o projeto Karangos
      </Typography>

      {/*
          4. Abaixo do título, coloque um componente Paper e, dentro dele, renderize o
             conteúdo da variável de estado criada na etapa 2.
      */}
      <Paper 
        elevation={6}
        sx={{
          padding: '24px',
          maxWidth: '500px',
          margin: 'auto'
        }}
      >
        {about}
      </Paper>
    </>
  )
}