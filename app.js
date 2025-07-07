// IMPORTANDO O EXPRESS
const express = require("express");

// CONEXAO COM O BANCO DE DADOS
const db = require('./models/db');

// IMPORTANDO O BCRYPTJS
const bcrypt = require('bcryptjs');
const { where } = require("sequelize");

// Importando o JWT para autenticação de usuários
const jwt = require('jsonwebtoken'); 

// Importando o dotenv para carregar variaveis de ambiente
require('dotenv').config(); // Carrega as variaveis de ambiente do arquivo .env

const { eAdmin } = require('./middlewares/auth'); // Importando o middleware de autenticação

// IMPORTANDO O MODELO DE USUARIO
const User = require('./models/User');

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

// CRIANDO ROTA GET: NODE.JS + MYSQL:
app.get('/users', eAdmin, async (req, res) => { // ROTA PARA LISTAR TODOS OS USUARIOS
    
    await User.findAll({ // findAll = busca todos os usuarios no banco de dados.
        attributes: ['id', 'name', 'email', 'password'], // Especifica quais atributos devem ser retornados.
        order: [['id', 'DESC']] // Ordena os resultados pelo id em ordem decrescente.
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
        });
    });

    
    //console.log('Acessou a rota listar!');
    //res.send("Bem vindo, Fernando! Esse e o curso de Node.js!!!"); // Envia uma resposta de volta ao cliente.
});

// CRIANDO ROTA GET: NODE.JS + MYSQL:
app.get('/user/:id', eAdmin, async (req, res) => { // ROTA PARA VISUALIZAR UM USUARIO ESPECIFICO PELO ID
    // res.send('Visualizar contato!');

    //const id = req.params.id; AQUI E NO JEITO NORMAL.
    const { id } = req.params; // AQUI USANDO A DESESTRUTURACAO PARA OBTER O ID DO USUARIO DOS PARAMETROS DA REQUISICAO.

    //await Usuario.findAll({ where: { id: id } })
    await User.findByPk(id) // findByPk = find by primary key, ou seja, busca pelo id do usuario.
    .then ((user) => { // Se a busca for bem sucedida, o usuario sera retornado.
        return res.json({ // Retorna o usuario encontrado.
            erro: false, // Indica que nao houve erro na busca.
            user: user // Retorna o usuario encontrado.
        });
    }).catch (() => { // Se a busca falhar, o erro sera tratado aqui.
        return res.status(400).json({ // Retorna um erro 400 (Bad Request) com a mensagem de erro.
            erro: true, // Indica que houve um erro na busca.
            mensagem: 'Erro! Usuario nao encontrado!' // Mensagem de erro.
        });
    });

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
app.post('/user', eAdmin,  async (req, res) => {    
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8); // Criptografa a senha do usuario usando bcrypt com um salt de 8 rounds.

    await User.create(dados)
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

// ROTA PARA EDITAR O USUARIO: NODE.JS + MYSQL:
app.put('/user', eAdmin, async (req, res) => { // ROTA PARA EDITAR O USUARIO
    const { id } = req.body; // Extrai o id do corpo da requisição para identificar qual usuario deve ser editado.

    await User.update(req.body, {where: {id}}) // Atualiza o usuario com os novos dados fornecidos no corpo da requisição, filtrando pelo id do usuario.
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario editado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Usuario nao editado!"
        })
    });
});

// ROTA PARA EDITAR A SENHA DO USUARIO:
app.put('/user-senha', eAdmin, async (req, res) => { // ROTA PARA EDITAR A SENHA DO USUARIO
    const { id, password } = req.body; // Extrai o id e a senha do corpo da requisição.

    var senhaCrypt = await bcrypt.hash(password, 8) // Criptografa a nova senha do usuario.
    
    await User.update({password: senhaCrypt}, {where: {id}}) // Atualiza o usuario com a nova senha criptografada.
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Senha editada com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Senha nao editado com sucesso!" 
        })
    });
});

// ROTA PARA EXCLUIR O USUARIO: NODE.JS + MYSQL:
app.delete('/user/:id', eAdmin, async (req, res) => { // ROTA PARA EXCLUIR O USUARIO
    const { id } = req.params; // Extrai o id do usuario a ser excluido dos parametros da requisição.

    await User.destroy({where: {id}}) // Exclui o usuario do banco de dados filtrando pelo id fornecido.
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario excluido com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Usuario nao excluido!"
        });
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

// ROTA PARA LOGIN DO USUARIO: NODE.JS + MYSQL
app.post('/login', async (req, res) => { // ROTA PARA LOGIN DO USUARIO
    const user = await User.findOne({ // findOne = busca um unico usuario no banco de dados.
        attributes: ['id', 'name', 'email', 'password'], // Especifica quais atributos devem ser retornados.
        where: { // where = filtra os resultados com base em uma condicao especifica.
            email: req.body.email // Filtra os resultados pelo email fornecido no corpo da requisição.
        }
    });

    // Se o usuario nao for encontrado, retorna um erro:
    if (!user) { // Se o usuario nao for encontrado, retorna um erro.
        return res.status(400).json({ // Retorna um erro 400 (Bad Request) com a mensagem de erro.
            erro: true, // Indica que houve um erro na autenticação.
            mensagem: "Erro! Usuario nao encontrado!" // Mensagem de erro indicando que o usuario nao foi encontrado.
        });
    };

    // Se o usuario for encontrado, verifica se a senha fornecida corresponde a senha armazenada no banco de dados.
    // A senha fornecida pelo usuario e comparada com a senha armazenada no banco de dados usando bcrypt.
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password); // Compara a senha fornecida com a senha armazenada no banco de dados.
    if (!isPasswordValid) { // Se a senha nao for valida, retorna um erro.
        return res.status(400).json({ // Retorna um erro 400 (Bad Request) com a mensagem de erro.
            erro: true, // Indica que houve um erro na autenticação.
            mensagem: "Erro! Senha invalida!" // Mensagem de erro indicando que a senha e invalida.
        })
    };

    // Se a senha for valida, gera um token JWT para o usuario.
    var token = jwt.sign({ id: user.id }, process.env.SECRET, { // Cria um token JWT usando a chave secreta definida no arquivo .env.
        expiresIn: '48h' // Define o tempo de expiração do token para 48 horas.
    });

    return res.json({ // Se a autenticação for bem sucedida, retorna uma resposta de sucesso.
        erro: false, // Indica que nao houve erro na autenticação.
        mensagem: "Login efetuado com sucesso!", // Mensagem de sucesso indicando que o login foi efetuado com sucesso.
        token // Retorna o token JWT gerado para o usuario.
    });
});

app.listen(8080, () => { // Inicia o servidor HTTP e faz com que ele "escute" por requisições em uma porta específica.
    console.log("SERVIDOR RODANDO NA PORTA 8080!");
});