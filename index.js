//Pegando o express
const express = require("express");
//Criando uma Cópia do Express
const app = express()
//bodyParser
const bodyParser = require("body-parser")
//Importando a conexão
const connection = require('./database/database')
//Importando o Model de Pergunta
const Pergunta = require('./database/Pergunta')
//Importando o model Resposta
const Resposta = require("./database/Resposta")
//Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão Feita Com o Banco de Dados")
    })
    .catch((err) =>{
        console.log(err)
    })

//Declarando que a engine vai ser o EJS
app.set('view engine','ejs')
//Definir arquivos estaticos
app.use(express.static('public'))
//Ativando bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Criando Rota
app.get("/",(req,res) => {
    //Puxando as Perguntas do Banco de Dados
    Pergunta.findAll({raw: true, order:[
        ['id','DESC'] //ASC = Crescente / DESC = Decrescente
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    })
    
})

//Criando rota de pergunta
app.get("/perguntar",(req,res) => {
    res.render("perguntar")
})

//Formulario POST rota POST também
app.post("/salvarpergunta",(req,res) => {
    //Recebo dados do Formulário e Salvo em variaveis
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    //Salvando dados na tabela
    //Usando o model da tabela
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
}) 

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //existe
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {             
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }else { // Não encontrada
            res.redirect("/")
        }
    })
})

app.post("/responder", (req,res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`)
    })
})

//Abrindo o Servidor
app.listen(8080,() => {console.log("App Rodando")})