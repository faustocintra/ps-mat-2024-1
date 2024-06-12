import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import myfetch from '../lib/myfetch';
import useNotification from '../ui/useNotification'
import useWaiting from '../ui/useWaiting'

export default function Prova2() {
    const [state, setState] = React.useState({
        sobre: null
    })
    const {
        sobre
    } = state

    const { notify, Notification } = useNotification()
    const { showWaiting, Waiting } = useWaiting()

    React.useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        showWaiting(true)
        try {
            const result = await myfetch.get('https://api.faustocintra.com.br/about/1')
            console.log('Fetched data:', result)
            setState({
                ...state,
                sobre: result,
            })
        }
        catch(error) {
            console.error(error)
            notify(error.message, error)
        }
        finally {
            showWaiting(false)
        }
    }

    return (
        <>
            <Waiting />
            <Notification />

            <Typography variant="h1" gutterBottom>
                Sobre o projeto Karangos
            </Typography>
            <Paper elevation={10}>
                {sobre ? (
                    <Typography variant="body1">
                        {sobre.info}
                    </Typography>
                ) : (
                    'Carregando...'
                )}
            </Paper>
        </>
    )
}