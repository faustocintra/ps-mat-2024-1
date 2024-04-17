import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import myfetch from '../../../lib/myfetch';
import Waiting from '../../waiting';

const columns = [
    {
      field: 'id',
      headerName: 'Cód.',
      width: 90
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
      valueGetter: (value, row)=> row.municipality + '/' + row.state
    },
    {
      field: 'phone',
      headerName: 'Tel./celular',
      width: 160
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150
    },
  ];
   
  export default function CustomerList() {
   
    const [state, setState] = React.useState({
      customers: [],
      showWaiting: false
    })
    const {
      customers,
      showWaiting
    } = state
   
    /*
      useEffect() com vetor de dependências vazio irá ser executado
      apenas uma vez, durante o carregamento inicial do componente
    */
    React.useEffect(() => {
      fetchData()
    }, [])
   
    async function fetchData() {
      setState({ ...state, showWaiting: true })
      try {
        const result = await myfetch.get('/customers')
        console.log(result)
        setState({
          ...state,
          customers: result,
          showWaiting: false
        })
      }
      catch(error) {
        console.error(error)
        setState({
          ...state,
          showWaiting: false
        })
      }
    }
   
    return(
      <>
        <Typography variant="h1" gutterBottom>
          Listagem de clientes
        </Typography>
   
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
      </>
    )
  }