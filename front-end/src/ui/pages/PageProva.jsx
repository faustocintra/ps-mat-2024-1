import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'


export default function PageProva() {
    const [info, setInfo] = useState([])

        useEffect(() => {
            const dadosApi = async () => {
                try{
                    const res = await fetch('https://api.faustocintra.com.br/about/1')
                    const dados = await res.json()
                    setInfo(dados.info)
                }
                catch{
                    console.error("Erro ao pegar api")
                }
            }
            dadosApi()
        }, [])  


        return (
        <>
            <Typography>
                Sobre o Projeto Karangos

                <Paper>
                    {info}
                </Paper>
            </Typography>
        </>
    )
}
