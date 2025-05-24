const express = require("express");
const app = express();

// CRIANDO ROTA:
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.listen(8080, () => {
    console.log("SERVIDOR INICIADO NA PORTA 8080!");
});