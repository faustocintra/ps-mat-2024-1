//Importando  o Prisma Client
import prisma from '../database/client.js'
    import bcrypt from 'bcrypt'

const controller = {} //Objeto vazio

// Criando novo usuário
controller.create = async function (req, res) {
    try {

        // se o campo password tiver sido passado dentro de req.body
        //é necessário criptografar a senha
        // ISSO É FEITO COM A BIBLIOTECA BCRYPT USANDO 12 PASSOS DE CRIPTOGRAFIA
        if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 12)
        }

        await prisma.user.create({ data: req.body})

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
        const result = await prisma.user.findMany()

        // Excui o campo password antes de enviar os dados para o cliente
        for(let user of result) {
            if(user.password) delete user.password
        }

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
       const result = await prisma.user.findUnique({
        where: {id: Number(req.params.id)}
       })

        // Excui o campo password antes de enviar os dados para o cliente
        if(result.password) delete result.password
        

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

        // se o campo password tiver sido passado dentro de req.body
        //é necessário criptografar a senha
        // ISSO É FEITO COM A BIBLIOTECA BCRYPT USANDO 12 PASSOS DE CRIPTOGRAFIA
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12)
            }

       const result = await prisma.user.update({
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
        const result = await prisma.user.delete({
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