const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        //Impede valores Nulos
        allowNull: false
    },
    descricao: {
        //Tipo TEXT para textos longos
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(() =>{
    console.log("Tabela Criada")
})

module.exports = Pergunta