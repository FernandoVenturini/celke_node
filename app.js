// IMPORTANDO O EXPRESS
const express = require("express");

const Usuario = require('./models/Usuario');

// CONEXAO COM O BANCO DE DADOS
const db = require('./models/db');

// INICIALIZANDO O EXPRESS
const app = express();

// PREPARANDO A APLICACAO PARA RECEBER OS DADOS EM JSON:
app.use(express.json());

/* CRIANDO MIDDLEWARES: e executado antes de qualquer rota.
app.use((req, res, next) => {
    console.log('Acessou o Middleawares!');
    next();
}); 

// CRIANDO O MIDDLEWARES:
function valContato(req, res, next) {

    if (!req.body.name) {
        return res.json({
            erro: true,
            mensagem: 'Necessario enviar o e-mail!'
        });
    };
    return next();
};
*/

// CRIANDO ROTA GET:
app.get('/users', async (req, res) => {

    await Usuario.findAll({
        attributes: ['id', 'name', 'email'],
        order:[['id', 'DESC']]
    })
    .then ((users) => {
        return res.json({
            erro: false,
            users
        });
    }).catch (() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Nenhum usuario encontrado!"
        })
    })

    
    //console.log('Acessou a rota listar!');
    //res.send("Bem vindo, Fernando! Esse e o curso de Node.js!!!"); // Envia uma resposta de volta ao cliente.
});

// ROTA GET - CONTATO(VISUALIZAR):
app.get('/usuario/:id', (req, res) => { // FAZENDO REQUISICAO
    // res.send('Visualizar contato!');

    //const id = req.params.id; AQUI E NO JEITO NORMAL.
    const {id} = req.params; // AQUI USANDO A DESESTRUTURACAO.

    //const sit = req.query.sit; AQUI E NO JEITO NORMAL.
    const {sit} = req.query; // AQUI USANDO A DESESTRUTURACAO.

    return res.json({
        //id: id, AQUI E NO JEITO NORMAL.
        id, // AQUI USANDO A DESESTRUTURACAO.
        nome: 'Cesar',
        email: 'cesar@celke.com',
        // sit: sit AQUI E NO JEITO NORMAL.
        sit // AQUI USANDO A DESESTRUTURACAO.
    });
});

// CRIANDO ROTA POST: NODE.JS + MYSQL:
app.post('/user', async (req, res) => {    
    const { name, email  } = req.body;

    await Usuario.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Usuario nao cadastrado com sucesso!"
        })
    });
});

// CRIANDO ROTA PUT:
app.put('/usuario', (req, res) => {
    const { id, nome, email } = req.body;

    return res.json({
        erro: false,
        id,
        nome,
        email
    });
});

// CRIANDO ROTA DELETE:
app.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;
    return res.json({
        erro: false,
        id
    });
});

// CRIANDO ROTA POST:
/*app.post('/contato', valContato, (req, res) => {
    console.log('Acessou a rota Cadastrar!');

    var name = req.body.name;
    var { email } = req.body;

    return res.json({
        name: name,
        email
    });

});

// CRIANDO METODO PUT:
app.put('/contato/:id', (req, res) => {
    //const id = req.params.id; // USANDO JEITO NORMAL
    //const nome = req.body.nome; // USANDO JEITO NORMAL
    //const email = req.body.email; // USANDO JEITO NORMAL

    const { id } = req.params; // USANDO DESESTRUTURACAO
    const { nome } = req.body;// USANDO DESESTRUTURACAO
    const { email } = req.body; // USANDO DESESTRUTURACAO
    //const { _id, nome, email } = req.body; Forma otimizada.

    return res.json([
        id,
        //_id,
        nome,
        email
    ]); 
});

// CRIANDO METODO DELETE:
app.delete('/contato/:id', (req, res) => {
    const { id } = req.params;

    return res.json({
        id
    });
});
*/
app.listen(8080, () => { // Inicia o servidor HTTP e faz com que ele "escute" por requisições em uma porta específica.
    console.log("SERVIDOR RODANDO NA PORTA 8080!");
});