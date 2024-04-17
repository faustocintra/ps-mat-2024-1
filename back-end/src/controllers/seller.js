// Importando o Prisma Client
import prisma from '../database/client.js'

const controller = {}   // Objeto vazio

// Criando um novo seller
controller.create = async function (req, res) {
  try {
    await prisma.seller.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Mostrando todos os sellers
controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.seller.findMany()

    // HTTP 200: OK (implícito)
    res.send(result)

  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Mostrando um seller por id
controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.seller.findUnique({
      where: { id: Number(req.params.id) }
    })

    // Encontrou: retorna HTTP 200: OK
    if(result) res.send(result)
    // Não encontrou: retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Atualizando/modificando um seller
controller.update = async function(req, res) {
  try {
    const result = await prisma.seller.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // Encontrou e atualizou: retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou): retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Removendo um seller
controller.delete = async function(req, res) {
  try {
    const result = await prisma.seller.delete({
      where: { id: Number(req.params.id) }
    })

    // Encontrou e excluiu: retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não excluiu): retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

export default controller