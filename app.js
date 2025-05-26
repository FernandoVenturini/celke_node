// IMPORTANDO O EXPRESS
const express = require("express");

// INICIALIZANDO O EXPRESS
const app = express();

// PREPARANDO A APLICACAO PARA RECEBER OS DADOS EM JSON:
app.use(express.json());

// CRIANDO ROTA GET:
app.get('/', (req, res) => {
    res.send("Bem vindo, Fernando! Esse e o curso de Node.js!"); // Envia uma resposta de volta ao cliente.
});

// ROTA GET - CONTATO(VISUALIZAR):
app.get('/contato/:id', (req, res) => { // FAZENDO REQUISICAO
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

// CRIANDO ROTA POST:
app.post('/contato', (req, res) => {

    var name = req.body.name;
    var { email } = req.body;

    return res.json({
        name: name,
        email
    });

});

app.listen(8080, () => { // Inicia o servidor HTTP e faz com que ele "escute" por requisições em uma porta específica.
    console.log("SERVIDOR RODANDO NA PORTA 8080!");
});