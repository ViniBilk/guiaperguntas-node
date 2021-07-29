//Criando o sequelize
const Sequelize = require('sequelize')
//Criando a conexão
//Nome do Banco, Usuário , Senha, Um JSON {Onde está ospedado, O tipo do servidor}
const connection = new Sequelize('guiaperguntas','root','OpenFire#15',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection