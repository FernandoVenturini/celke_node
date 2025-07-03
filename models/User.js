// CRIANDO UMA MODEL
const Sequelize = require("sequelize");

// CRIANDO FUNCAO QUE VAI FAZER CONEXAO COM O BANCO DE DADOS
const db = require('./db');

// CRIANDO UMA MODEL
const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// SINCRONIZANDO A MODEL COM O BANCO DE DADOS
// User.sync({ force: true }); // Força a criação da tabela, apagando dados existentes.
//User.sync({ alter: true}); // Altera a tabela, mantendo os dados existentes.
//User.sync(); // Sincroniza a tabela sem alterar os dados existentes.

module.exports = User;