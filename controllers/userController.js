const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(15);

const userController = {
    register: async function (req, res){
        const emailSelecionado = await User.findOne({èmail: req.body.email})
        if(emailSelecionado) return res.status(400).send('Esse email já está cadastrado!')
        let senhaCriptografada = bcrypt.hashSync(req.body.senha, salt)
        const user = new User({
            nome: req.body.nome,
            email: req.body.email,
            senha: senhaCriptografada,
        })
        try {
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (error) {
            res.send(error)
        }
    },
    login: async function (req, res){
        const login = await User.findOne({
            nome: req.body.nome, 
            email: req.body.email,});
            if(login){
                if (bcrypt.compareSync(req.body.senha, login.senha)){
                    let token = jwt.sign(login.email, process.env.TOKEN_SECRETO);

                    res.header('autoriztion-token', token)
                    res.send('Usuário logado com sucesso! ' + login)
                    
                }else{
                    res.send('A senha está errada!')
                }
            }else{
                res.send('Não foi possível encontrar esse usuário em nosso sistema!')
            }
        }
};

module.exports = userController
