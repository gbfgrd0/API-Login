require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connection;

mongoose.connect(process.env.MONGOOSE_CONNECTION);
db.on('error', () => console.log("Houve um erro na conexão!"));
db.once('open', () => console.log("Banco de dados carregado!"));
app.use('/user', bodyParser.json() , userRouter);

app.listen(process.env.PORT, () =>{console.log("O servidor está rodando na porta: " + process.env.PORT)});

