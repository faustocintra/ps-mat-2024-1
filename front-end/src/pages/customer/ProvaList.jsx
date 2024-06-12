import React from "react"
import Typography from '@mui/material/Typography'
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

export default function ProvaList() {

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

  // Define um componente funcional chamado MeuComponente
function MeuComponente() {
  // Declaração de estados utilizando o hook useState
  const [dados, setDados] = useState(null); // Estado para armazenar os dados obtidos da API
  const [carregando, setCarregando] = useState(true); // Estado para controlar o carregamento dos dados
  const [erro, setErro] = useState(null); // Estado para armazenar erros, caso ocorram

  // Define um efeito colateral utilizando o hook useEffect
  useEffect(() => {
      // Função assíncrona para buscar os dados da API
      const fetchData = async () => {
          try {
              // Simula um atraso de 2 segundos para representar uma chamada assíncrona
              await new Promise(resolve => setTimeout(resolve, 2000));
              // Define os dados obtidos da API no estado 'dados'
              setDados({
                  id: '1',
                  info: 'Karangos é um projeto desenvolvido pelo Prof. Fausto Cintra juntamente os alunos do 5º semestre matutino de ADS da Fatec Franca. Seu objetivo é demonstrar as funcionalidades e possibilidades do React em conjunto com a biblioteca de componentes Material UI, acessando uma API REST desenvolvida com Node.js e Express. Clique sobre ícone do menu no canto superior esquerdo para acessar as funcionalidades.'
              });
              // Indica que o carregamento foi concluído
              setCarregando(false);
          } catch (error) {
              // Em caso de erro, define o erro no estado 'erro'
              setErro(error);
              // Indica que o carregamento foi concluído (mesmo que com erro)
              setCarregando(false);
          }
      };

      // Chama a função fetchData ao montar o componente, passando um array vazio como segundo argumento para garantir que o efeito só seja executado uma vez
      fetchData();
  }, []);

  // Renderiza condicionalmente com base nos estados
  if (erro) {
      // Se houver erro, retorna uma mensagem de erro com o erro específico
      return <div>Ocorreu um erro: {erro.message}</div>;
  }

  if (carregando) {
      // Se ainda estiver carregando, retorna uma tela de espera
      return <div>Tela de espera...</div>;
  }

  // Se não houver erros e o carregamento estiver concluído, renderiza o conteúdo dos dados
  return (
      <div>
          {/* Adiciona o título usando o componente Typography */}
          <Typography variant="h3" gutterBottom>
              Sobre o projeto Karangos
          </Typography>
          {/* Adiciona o componente Paper para envolver o conteúdo */}
          <Paper elevation={3} style={{ padding: '20px' }}>
              <p>ID: {dados.id}</p>
              <p>Informações: {dados.info}</p>
          </Paper>
      </div>
  );
}

}   
