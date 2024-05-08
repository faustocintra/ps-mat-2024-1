//importando o prisma client
import prisma from '../database/client.js'

const controller = [] //objeto vazio

//Criando um novo customer
controller.create = async function (req, res) {
    try {
        await prisma.customer.create({ data: req.body })

        //http 201: Created
        res.status(201).send({message: 'Created'}).end()
    }
    catch (error) {
        console.log(error);

        //http 500: internal server error
        res.status(500).end()
    }
}
controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.customer.findMany()

        //http 200: Ok (implicito)
        res.send(result)
    }
    catch (error) {
        console.log(error)

        //http 500: internal server error
        res.status(500).end()
    }
}
controller.retrieveOne = async function (req, res) {
    try {
        const result = await prisma.customer.findUnique({
            where: { id: Number(req.params.id) }
        })
        //encontrou retorna HTTP 200 Ok
        if (result) res.send(result)
        //não encontrou retorna HTTP 404: not found
        else res.status(404).end()
    }
    catch (error) {
        console.log(error)

        //http 500: internal server error
        res.status(500).end()
    }
}

controller.update = async function (req, res) {
    try {
        const result = await prisma.customer.update({
            where: { id: Number(req.params.id) },
            data: req.body
        })

        //encontrou e atualizou: retona HTTP 204: no Content
        if (result) res.status(204).end()
        //nao encontrou (e nao atualizou): retorna HTTP 404: not found
        else res.status(404).end()
    }
    catch (error) {
        console.log(error)

        //http 500: internal server error
        res.status(500).end()
    }
    
}
controller.delete = async function (req, res) {
    try {
        const result = await prisma.customer.delete({
            where: {id: Number(req.params.id) }
        })
        //encontrou e excluiu -> HTTP 204 No Content
        if(result) res.status(204).end()
        //Não encontrou (e não excluiu) -> HTTP 404: Not Found
        else res.status(404).end()
    }
    catch (error) {
        console.log(error)

        //http 500: internal server error
        res.status(500).end()
    }


}


export default controller