import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import  CircularProgress  from '@mui/material/CircularProgress';

export default function AboutPage() {
  //componente de função chamado AboutPage
  const [info, setInfo] = useState(''); /* useState para indicar o carregamento. É a variavel de estado 
  que armazena as informações do endpoint*/
  const [loading, setLoading] = useState(true); //para exibir a tela de espera

  useEffect(() => {
    // criando uma função assíncrona
    // useEffect para fazer a solicitação HTTP, quando o componente é montado pela 1ª vez
    async function fetchInfo() {
      //fecthInfo solicitação HTTP, e atualiza o estado com as informações recebidas
      try {
        const response = await fetch('https://api.faustocintra.com.br/about/1'); // faz a solicitação HTTP para o endpoint
        const data = await response.json() // converte para json 
        // fiz isso const data = await response.json() , pois anteriormente estava dando erro, pois eu estava fazendo setInfo(response.data.info)
        setInfo(data.info); // define as informações recebidas
        setLoading(false); // se a solicitação tiver sucesso, o carregamento é desativado 
      } catch (error) {
        console.error(error); // erro no console, caso tenha falha na solicitação
        setLoading(false); // em caso de erro, o status de carregamento será desativado
      }
    }

    fetchInfo(); // aqui é onde a função é chamada pra buscar as informações 

   
  }, );

  return (
    <>
      {loading ? ( //o CircularProgress irá ser renderizado enquando os dados vão sendo carregados 
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h1" gutterBottom>
            Sobre o projeto Karangos
          </Typography>
          <Paper elevation={3}>
            <Typography variant="body1">{info}</Typography> {/* renderiza as informações do endpoint dentro do paper*/}
          </Paper>
        </>
      )}
    </>
  );
}