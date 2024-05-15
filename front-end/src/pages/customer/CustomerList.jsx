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

export default function CustomerList() {

  const columns = [
    { 
      field: 'id',
      headerName: 'Cód',
      type: 'number',
      width: 80 
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 200    
    },
    {
      field: 'ident_document',
      headerName: 'CPF',
      width: 150    
    },
    {
      field: 'municipality',
      headerName: 'Município/UF',
      width: 200,
      // Colocando dois campos na mesma célula
      valueGetter: (value, row) => row.municipality + '/' + row.state
    },  
    {
      field: 'phone',
      headerName: 'Tel./Celular',
      width: 160,    
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,    
    },
    {
      field: '_edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      sortable: 'false',
      width: 90,
      renderCell: params => (
        <Link to={`./${params.id}`}>
          <IconButton aria-label="Editar">
            <EditIcon/>
          </IconButton>
        </Link>
      )
    },
    {
      field: '_delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      sortable: 'false',
      width: 90,
      renderCell: params => (        
          <IconButton aria-label="Excluir" onClick={() => handleDeleteButtonClick(params.id)}>
            <GridDeleteForeverIcon color="error" />
          </IconButton>        
      )
    },
  ];

    const [state, setState] = React.useState({
        customers: [],
        showWaiting: false
    })
    const {
        customers,        
    } = state

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

   async function fetchData() {
     showWaiting(true)
        try{
            const result = await myfetch.get('/customers')            
            setState({
                ...state,
                customers: result                
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

    async function handleDeleteButtonClick(deleteid) {
      if (await askForConfirmation('Deseja realmente excluir este item?')) {
        // Exibe a tela de espera
        showWaiting(true)
        try {
          await myfetch.delete(`/customers/${deleteid}`)

          //Recarrega os dados da grid
          fetchData()

          notify('Item excluido com sucesso')          
        }
        catch(error){
          console.log(error)
            notify(error.message, 'error')          
        }
        finally {
          showWaiting(false)
        }
      }
    }

    return(
        <>
          <Waiting />
          <Notification />
          <ConfirmDialog />

            <Typography variant="h1" gutterBottom>
                Listagem de Clientes
            </Typography>

            <Box sx={{
              display: 'flex',
              justifyContent: 'right',
              mb: 2   // marginBotton
            }}>
              <Link to="./new">
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  startIcon={<AddBoxIcon />}
                >
                  Novo Cliente               
                </Button>
              </Link>
            </Box>

            <Paper elevation={10}>            
              <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                  rows={customers}
                  columns={columns}
                  initialState={{
                  pagination: {
                      paginationModel: {
                      pageSize: 5,
                      },
                  },
                  }}
                  pageSizeOptions={[5]}                
              />
              </Box>
          </Paper>
        </>
    )
}