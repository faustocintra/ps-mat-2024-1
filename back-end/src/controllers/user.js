//importando o prisma client
import prisma from '../database/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const controller = [] //objeto vazio

//Criando um novo usuario
controller.create = async function (req, res) {
    try {
        //se o campo password tiver sido passado 
        //dentro de req.body é necessario criptografar
        // a senha isso é feito com a biblioteca bcrypt.
        //usando 12 passos de criptografia
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }

        await prisma.user.create({ data: req.body })

        //http 201: Created
        res.status(201).end()
    }
    catch (error) {
        console.log(error);

        //http 500: internal server error
        res.status(500).end()
    }
}
controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.user.findMany()


        // Exclui o corpo "password" antes de enviar os dados
        //para o cliente
        for (let user of result) {
            if (user.password) delete user.password
        }

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
        const result = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        })

        // Exclui o corpo "password" antes de enviar os dados
        //para o cliente
        if (result.password) delete result.password


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

        //se o campo password tiver sido passado 
        //dentro de req.body é necessario criptografar
        // a senha isso é feito com a biblioteca bcrypt.
        //usando 12 passos de criptografia
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }
        const result = await prisma.user.update({
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
        const result = await prisma.user.delete({
            where: { id: Number(req.params.id) }
        })
        //encontrou e excluiu -> HTTP 204 No Content
        if (result) res.status(204).end()
        //Não encontrou (e não excluiu) -> HTTP 404: Not Found
        else res.status(404).end()
    }
    catch (error) {
        console.log(error)

        //http 500: internal server error
        res.status(500).end()
    }


}

controller.login = async function (req, res) {
    try {

        //busca o usuario pelo e-mail passado
        const user = await prisma.user.findUnique({
            where: { email: req.body?.email }
        })
        //se usuario nao for encontrado, retorna
        //HTTP 401: Unauthorized
        if (!user) return res.send(401).end
        //usuario encontrado conferimos a senha
        const passwordOk = await bcrypt.compare(req.body.password, user.password)

        //senha errada, retorna
        //HTTP 401: Unauthorized
        if (!passwordOk) return res.send(401).end()

        //Usuário e senha OK, passamos do procedimento de gerar o token
        //excluimos o campo "password" do usauario, para q ele nao seja incluido no token

        if (user.password) delete user.password

        //Geração do token
        const token = jwt.sign(
            user,   //dados do usuario
            process.env.TOKEN_SECRET,  //senha para criptografar o token
            { expiresIn: '24h' }  //praso de validade do token
        )

        //retorna HTTP 200: ok
        res.send({ token })


    }


    catch (error) {
        console.log(error)
        //http 500: internal server error
        res.status(500).end()

    }

}

controller.me = function(req, res) {
    //retorna as informações do usuario logado que foram armazenadas
    //em req.authUser em src/middleware/auth.js

    //HTTP: OK(implicito)
    res.send(req.authUser)
}


export default controller