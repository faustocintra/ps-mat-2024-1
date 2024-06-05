import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import myfetch from '../../lib/myfetch'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'
import { boolean } from 'zod';
import { DatePicker } from '@mui/x-date-pickers';

export default function CarList() {

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.',
      type: 'number',
      width: 80 
    },
    {
      field: 'brand',
      headerName: 'Marca/Modelo',
      width: 300,
      // Colocando dois campos na mesma célula
      valueGetter: (value, row) => row.brand + '/' + row.model
    },
    
    {
      field: 'color',
      headerName: 'Cor',
      width: 100,
    },

    {
        field: 'year_manufacture',
        headerName: 'Ano de Fabricação',
        width: 200,
    },

    {
        field: 'imported',
        headerName: 'Importado',
        width: 200,
        valueGetter: (value, row) => value ? "SIM" : ""
    },

    {
        field: 'plates',
        headerName: 'Placa',
        width: 100,
    },

    {
        field: 'selling_date',
        headerName: 'Data de Venda',
        width: 200,
        valueGetter: (value, row) => {
          if (row.selling_date) {
            const sellingDate = new Date(row.selling_date);
            const day = String(sellingDate.getDate()).padStart(2, '0');
            const month = String(sellingDate.getMonth() + 1).padStart(2, '0');
            const year = sellingDate.getFullYear();
            return `${day}/${month}/${year}`;
          }
          return '';
        }
        
    },

    {
        field: 'selling_price',
        headerName: 'Preço de Venda',
        width: 200,
        valueGetter: (value, row) => {
          if (row.selling_price) {
            return parseFloat(row.selling_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          }
          return '';
        }
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
            <EditIcon />
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
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    },
  ]

  const [state, setState] = React.useState({
    cars: []
  })
  const {
    cars
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
    try {
      const result = await myfetch.get('/cars')
      setState({
        ...state,
        cars: result
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

  async function handleDeleteButtonClick(deleteId) {
    if(await askForConfirmation('Deseja realmente excluir este item?')) {
      // Exibe a tela de espera
      showWaiting(true)
      try {
        await myfetch.delete(`/cars/${deleteId}`)

        // Recarrega os dados da grid
        fetchData()

        notify('Item excluído com sucesso.')
      }
      catch(error) {
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
        Listagem de Carros
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
        mb: 2   // marginBottom
      }}>
        <Link to="./new">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<AddBoxIcon />}
          >
            Novo Carro
          </Button>
        </Link>
      </Box>

      <Paper elevation={10}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={cars}
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