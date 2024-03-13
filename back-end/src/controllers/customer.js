import prisma from '../database/client.js'

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {
    await prisma.customer.create({ data: req.body })

    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try{

    let include = {} 

    const result = await prisma.customer.findMany({
      include,
      orderBy: [
        { name: 'asc' }
      ]
    })

    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) }
    })

    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    const result = await prisma.customer.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    if(result) res.status(204).end()
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    const result = await prisma.customer.delete({
      where: { id: Number(req.params.id) }
    })
    
    if(result) res.status(204).end()
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export default controller