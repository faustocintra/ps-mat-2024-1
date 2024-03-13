// Importando o Prisma Client
import prisma from '../database/client.js'
import bcrypt from  'bcrypt'

const controller = {} //Objeto vazio 

//criando um novo carro 
controller.create = async function (req, res){
    try {
      await prisma.car.create({ data: req.body })

      //HTTP 201: Created 
      if( req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12)
    }

    await prisma.user.create({ data: req.body })
    //HTTP 201: created
    res.status(201).end()
    }
    catch(error){
      console.log(error)

      //HTTP 500: Internal Server Error
      res.status(500).end()
    }
}

controller.retriveAll = async function (req, res) {
    try {
     const result = await prisma.car.findMany()

        //Exclui o campo "password" antes de enviar os dados 
        //para o cliente 
        for (let user of result){
           if(user.password) delete user.password 
        }

        //HTTP 200: ok (implícito)
        res.send(result)
    }

    catch(error) {
        console.log(error)
  
        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}
    controller.retrieveOne = async function(req, res) {
        try{
           const result = await prisma.car.findUnique({ 
            where: { id: Number(req.params.id) }
           })

           //Encontrou : retorna HTTP 220: ok
           if(result)res.send(result)
           //Não encontrou: retorna HTTP 404: Not Found
          else res.status(404).end()

        }
        catch(error){
            console.log(error)
      
            //HTTP 500: Internal Server Error
            res.status(500).end()
        }

    }

    controller.update = async function(req, res) {
        try {
         const result = await prisma.car.update({ 
            where: { id: Number(req.params.id) }, 
            data: req.body
         })
    
        //Encontrou e atualizou: retorna HTTP 204: No Content 
        if(result) res.status(204).end()
        //Não encontrou (e não atualizou): retornar HTTP 404: Not Found
        else res.status(404).end()
        }
        catch(error){
            console.log(error)
      
            //HTTP 500: Internal Server Error
            res.status(500).end()
        }
    }

    controller.delete = async function(req, res) {
        try {
            const result = await prisma.car.delete({ 
            where: { id: Number(req.params.id) }, 

        })

        //Encontrou e excluiu: retorna HTTP 204: No Content 
         if(result) res.status(204).end()
         //Não encontrou (e não excluiu): retornar HTTP 404: Not Found
         else res.status(404).end()
        } 
        catch(error){
            console.log(error)
      
            //HTTP 500: Internal Server Error
            res.status(500).end()
        }

    }

export default controller 