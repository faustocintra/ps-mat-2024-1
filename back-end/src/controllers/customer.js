//Importando  o Prisma Client
import prisma from '../database/client.js'

const controller = {} //Objeto vazio

// Criando novo carro
controller.create = async function (req, res) {
    try {
        await prisma.customer.create({ data: req.body})

        //http 201: Created
        res.status(201).end()
    }
    catch(error){
        console.log(error)

        //http 500: Internal Server Error
        res.status(500).end()
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.customer.findMany()

        //http 200: OK (Implícito)
        res.send(result)
    }
    catch(error){
        console.log(error)

        //http 500: Internal Server Error
        res.status(500).end()
    }
}

controller.retrieveOne = async function (req, res) {
    try {
       const result = await prisma.customer.findUnique({
        where: {id: Number(req.params.id)}
       })

       //Encontrou: retorna http 200: OK
       if(result) res.send(result)

       //Não encontrou: retorna http 404: Not found
       else res.status(404).end()
    }
    catch(error){
        console.log(error)

        //http 500: Internal Server Error
        res.status(500).end()
    }
}

controller.update = async function (req, res){
    try {
       const result = await prisma.customer.update({
        where: { id: Number(req.params.id)},
        data: req.body
       })

       //Encontrou e atualizou: retorna http 204: No content
       if(result) res.status(204).end()

       //Não encontrou (e não atualizou): retorna http 404: Not found
       else res.status(404).end()
     }
     catch(error){
         console.log(error)
 
         //http 500: Internal Server Error
         res.status(500).end()
     }
}

controller.delete = async function (req, res){
    try {
        const result = await prisma.customer.delete({
            where: { id: Number(req.params.id)}
        })
            //Encontrou e excluiu -> HTTP 204: No Content
            if(result) res.status(204).end()
            
            //Não encontrou (e não excluiu) -> HTTP 404: Not found
            else res.status(404).end()
        }
    catch(error){
        console.log(error)

        //http 500: Internal Server Error
        res.status(500).end()
    }
}

export default controller