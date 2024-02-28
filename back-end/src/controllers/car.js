import prisma from "../database/client.js";

const controller = {}


controller.create = async (req, res) => {
    try {
        await prisma.car.create({ data: req.body })
        res.status(201).end();
    } catch (error) {
        console.log(error)
        res.status(500).end();
    }
}

controller.retrieveAll = async (req, res) => {
    try {
        const data = await prisma.car.findMany();

        res.send(data).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const data = await prisma.car.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (data) {
            res.send(data).end();
        } else {
            res.status(404).end();
        }

    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

controller.update = async function (req, res) {
    try {
        const result = await prisma.car.update({
            where: { id: Number(req.params.id) },
            data: req.body
        })

        if (result) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export default controller;