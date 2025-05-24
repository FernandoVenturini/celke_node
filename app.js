// IMPORTANDO O EXPRESS
const express = require("express");
// INICIALIZANDO O EXPRESS
const app = express();

// CRIANDO ROTA:
app.get('/', (req, res) => {
    res.send("Bem vindo, Fernando!!!"); // Envia uma resposta de volta ao cliente.
});

app.listen(8080, () => { // Inicia o servidor HTTP e faz com que ele "escute" por requisições em uma porta específica.
    console.log("SERVIDOR INICIADO NA PORTA 8080!");
});