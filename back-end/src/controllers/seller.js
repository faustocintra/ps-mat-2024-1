//importar o prisma client
import prisma from '../database/client.js'

const controller = {} //objeto vazio

//criar novo vendedor
controller.create = async function (req, res) {
    try {
        await prisma.seller.create({ data: req.body })

        //HTTP 201: Criado
        res.status(201).end()
    }
    catch(error) {
        console.log(error)

        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

//Acessar todos os vendedores
controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.seller.findMany()

        //HTTP 200: OK (implicito)
        res.send(result)
    }
    catch(error) {
        console.log(error)

        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

//Acessar um vendedor
controller.retrieveOne = async function (req, res) {
    try {
        const result = await prisma.seller.findUnique({
            where: {id: Number(req.params.id)}
        })

        //Encontrou: retornar HTTP 200: OK
        if(result) res.send(result)
        //Não encontrou: retorna HTTP 404: Not Found
        else res.status(404).end()
    }
    catch(error) {
        console.log(error)

        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

//Atualizar vendedor
controller.update = async function (req, res) {
    try {
        const result = await prisma.seller.update({
            where: { id: Number(req.params.id) },
            data: req.body
        })

        //Encontrou e atualizou: retorna HTTP 204: No content
        if(result) res.status(204).end()
        //Não encontrou (e não atualizou): retorna HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.log(error)

        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

//Deletar vendedor
controller.delete = async function (req, res) {
    try {
        const result = await prisma.customer.delete({
            where: { id: Number(req.params.id) }
        })

        //Encontrou e excluiu ~> HTTP 204: No Content
        if(result) res.status(204).end()
        //Não encontrou (e não excluiu) ~> HTTP 404: Not Found
        else res.status(404).end()
    }
    catch(error) {
        console.log(error)

        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

export default controller