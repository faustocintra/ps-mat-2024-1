//importando o prima client
import prisma from '../database/client.js'
import bcrypt from 'bcrypt'

const controller = {} //objeto vazio

//criando novo usuario
controller.create =  async function(req, res){
    try{
      await prisma.user.create({data: req.body})
      
      // Se o campo "password"t tiver sido passado
      //dentro de req.body, é nessecário criptografar a senha
      //isso é feito pela biblioteca bcrypt,
      //usando 12 passos de criptografia
      if(req.body.password){
      req.body.password = await bcrypt.hash(req.body.password, 12)
      }

      await prisma.user.create({data: req.body})

      //HTTP 201: Created
      res.status(201).end()
    }
    catch(error){
        console.log(error)

        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

controller.retrieveAll = async function (req, res){

  try{
    const result = await prisma.user.findMany()

    //Excluir o campo "password" antes de enviar os dados  p/ cliente
    for(let user of result){
      if(user.password) delete user.password
    }

    //HTTP 200:OK (implícito)
    res.send(result)
  }
     catch(error){
    console.log(error)

    //HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveOne = async function (req, res){
  try{
    const result = await prisma.user.findUnique({
      where : { id: Number(req.params.id)}
    })

    //excluir o caompo "password" antes de envias os dados p/ cliente
    if(result.password) delete result.password

    // Encontrou: retorna HTTP 200: OK
    if(result) res.send(result)
    // Não encontrou: retorna HTTP 404: Not Found
  else res.status(404).end()

  }
  catch(error){
    console.log(error)

    //HTTP 500: Internal Server Error
    res.status(500).end()
  }
}
controller.update = async function(req, res){
  try{
      // Se o campo "password"t tiver sido passado
      //dentro de req.body, é nessecário criptografar a senha
      //isso é feito pela biblioteca bcrypt,
      //usando 12 passos de criptografia
      if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 12)
        }

    const result = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // Encontrou e atualizou: retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou): retorna HTTP 404: Not Found 
    else res.status(404).end()
  }

  catch(error){
    console.log(error)

    //HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.delete = async function(req, res){

  try{
    const result = await prisma.user.delete({
      where: { id: Number(req.params.id)}
    })

    //Encontrou e excluiu - HTTP 204 No Content
    if(result) res.status(204).end()

    //Não encontrou não excluiu - HTTP 404 Not Found
    else res.status(404).end()
    }

    catch(error){
      console.log(error)
  
      //HTTP 500: Internal Server Error
      res.status(500).end()
    }
}

export default controller