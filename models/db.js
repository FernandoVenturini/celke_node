// IMPORTANDO O SEQUELIZE
const Sequelize = require('sequelize');

// FAZENDO CONEXAO COM BANCO DE DADOS
const sequelize = new Sequelize('celke', 'root', 'Lavinia12*', {
    host: 'localhost',
    dialect: 'mysql' // TIPO DE BANCO DE DADOS
});

// Testando a conexão com o banco de dados usando o Sequelize
sequelize.authenticate()
.then(function () {
    console.log("Conexao com o banco de dados realizado com sucesso!!!");
}).catch(function () {
    console.log("Erro! Conexao com o banco de dados nao realizado com sucesso!");
});


// INSTARTANDO O SEQUELIZE
module.exports = sequelize;