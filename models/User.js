// CRIANDO UMA MODEL
const Sequelize = require("sequelize");

// CRIANDO FUNCAO QUE VAI FAZER CONEXAO COM O BANCO DE DADOS
const db = require('./db');

// CRIANDO UMA MODEL
const Usuario = db.define('users', {
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
    }
});

User.sync();

module.exports = User;