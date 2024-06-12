import React, { useEffect } from 'react'; 
import Typography from '@mui/material/Typography'; 
import Paper from '@mui/material/Paper';
import useNotification from '../ui/useNotification' 
import useWaiting from '../ui/useWaiting';

export default function Bia() {

   const [about, setAbout] = React.useState('') // Estado para armazenar informações sobre o projeto

   const { notify, Notification } = useNotification() // Usa o hook de notificação
   const { showWaiting, Waiting } = useWaiting() // Usa o hook de indicador de espera
 
   useEffect(() => {
     fetchData() // Executa a função fetchData quando o componente é montado
   }, [])
 
   // Função assíncrona para buscar dados da API
   const fetchData = async () => {
     showWaiting(true); // Mostra o indicador de espera
     try {
       // Requisição para obter os dados sobre o projeto
       const response = await fetch(`https://api.faustocintra.com.br/about/1`)
       const result = await response.json() // Converte a resposta para JSON
       setAbout(result) // Atualiza o estado com os dados obtidos
       notify(`Sobre carregado com sucesso.`) // Exibe uma notificação de sucesso
     } 
     // Tratamento de erro
     catch (error) {
       console.error(error)
       notify(error.message, 'error') // Exibe uma notificação de erro
     } 
     finally {
       showWaiting(false) // Esconde o indicador de espera, independentemente do resultado
     }
   }
 
   return (
     <>
         <Waiting /> {/* Renderiza o indicador de espera */}
         <Notification /> {/* Renderiza as notificações */}

         <Typography variant='h1' gutterBottom>
           Sobre o projeto Karangos
         </Typography>

         <Paper elevation={3} sx={{ textAlign: 'justify', p: 5}}>
           {about.info} {/* Exibe as informações sobre o projeto */}
         </Paper>

     </>
   )
}
