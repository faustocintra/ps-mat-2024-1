import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import useNotification from '../ui/useNotification';
import useWaiting from '../ui/useWaiting';

// Componente principal "Sobre"
export default function Sobre() {

   // Declara um estado chamado 'about' com o valor inicial de uma string vazia
   const [about, setAbout] = useState('');

   // Extrai funções de notificação e componente de notificação do hook personalizado useNotification
   const { notify, Notification } = useNotification();

   // Extrai funções de espera e componente de espera do hook personalizado useWaiting
   const { showWaiting, Waiting } = useWaiting();
 
   // Hook useEffect para chamar fetchData quando o componente é montado
   useEffect(() => {
     fetchData();
   }, []);
 
   // Função assíncrona para buscar dados da API
   const fetchData = async () => {
     // Mostra o indicador de espera
     showWaiting(true);
     try {
       // Faz uma requisição GET para a API
       const response = await fetch(`https://api.faustocintra.com.br/about/1`);
       // Converte a resposta para JSON
       const result = await response.json();
       // Atualiza o estado 'about' com o resultado
       setAbout(result);
       // Notifica o usuário sobre o sucesso da operação
       notify(`Sobre carregado com sucesso.`);
     } 
     catch (error) {
       // Registra o erro no console
       console.error(error);
       // Notifica o usuário sobre o erro
       notify(error.message, 'error');
     } 
     finally {
       // Oculta o indicador de espera
       showWaiting(false);
     }
   };
 
   // Renderiza o componente
   return (
     <>
         {/* Componente de espera */}
         <Waiting />
         {/* Componente de notificação */}
         <Notification />

         {/* Título da seção */}
         <Typography variant='h1' gutterBottom>
           Sobre o projeto Karangos
         </Typography>

         {/* Contêiner de papel estilizado com o conteúdo sobre o projeto */}
         <Paper elevation={3} sx={{ textAlign: 'justify', p: 5 }}>
           {about.info}
         </Paper>
     </>
   );
}
