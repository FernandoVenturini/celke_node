// IMPORTANDO O DOTENV (PRIMEIRA LINHA)
require('dotenv').config();

// IMPORTANDO O SEQUELIZE
const { Sequelize } = require('sequelize');

// CONEXÃO COM O BANCO DE DADOS
const sequelize = new Sequelize(
    process.env.DB_NAME,   // ✅ NOME CORRETO
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mariadb', // ✅ CORRETO PARA MariaDB
        logging: false
    }
);

// TESTANDO A CONEXÃO
sequelize.authenticate()
.then(() => {
    console.log("Conexao com o banco de dados realizada com sucesso!");
})
.catch((error) => {
    console.log("Erro! Conexao com o banco de dados nao realizado com sucesso!");
    console.error(error);
});

module.exports = sequelize;
