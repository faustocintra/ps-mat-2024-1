import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Waiting from '../../ui/Waiting';
import myfetch from '../../lib/myfetch';
import SaveIcon from '@mui/icons-material/Save';
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Nome',
        width: 250,
        editable: true,
    },
    {
        field: 'ident_document',
        headerName: 'Documento',
        width: 150,
    },
    {
        field: 'municipality',
        headerName: 'Cidade/UF',
        width: 200,
        valueGetter: (value, row) => row.municipality + '/' + row.state
    },
    {
        field: 'phone',
        headerName: 'Telefone',
        width: 160,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
    }
];


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [waiting, setWaiting] = useState(false);

    //UseEffect com array de dependencias vazio irá ser executado apenas uma vez,
    // durante o carregamento inicial do componente
    useEffect(() => {
        loadCustomers();
    }, [])

    const loadCustomers = async () => {
        setWaiting(true)
        try {
            const data = await myfetch.get("/customers");
            if (data) {
                setCustomers(data);
            }
        } catch (error) {
            console.log(error)
        }
        setWaiting(false)
    }
    return (
        <>
            <Waiting show={waiting} />
            <Typography variant='h2' gutterBottom>
                Listagem de Clientes
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

export default CustomerList