// Importando o dotenv para carregar variáveis de ambiente do arquivo .env
require('dotenv').config(); // ← Adicione isso como primeira linha

// IMPORTANDO O SEQUELIZE
const Sequelize = require('sequelize');

// FAZENDO CONEXAO COM BANCO DE DADOS
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, { // NOME DO BANCO DE DADOS, USUARIO, SENHA
    host: process.env.DB_HOST, // HOST DO BANCO DE DADOS
    dialect: 'mysql' // TIPO DE BANCO DE DADOS
});

// Testando a conexão com o banco de dados usando o Sequelize
sequelize.authenticate() // authenticate() é um método do Sequelize que tenta estabelecer uma conexão com o banco de dados.
.then(function () { // Se a conexão for bem-sucedida, a função de sucesso será chamada.
    console.log("Conexao com o banco de dados realizado com sucesso!!!"); // Exibe uma mensagem de sucesso no console.
}).catch(function (error) { // Se a conexão falhar, a função de erro será chamada.
    console.log("Erro! Conexao com o banco de dados nao realizado com sucesso!"); // Exibe uma mensagem de erro no console.
    console.error(error); // Exibe o erro específico no console.
});


// INSTARTANDO O SEQUELIZE
module.exports = sequelize;