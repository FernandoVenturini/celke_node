const jwt = require('jsonwebtoken'); // Import the JWT library
const { promisify } = require('util'); // Import promisify to convert callback-based functions to promises
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    eAdmin: async function (req, res, next) {
        //return res.json({menssagem: "Validar token!"});
        const authHeader = req.headers.authorization; // Obtém o cabeçalho de autorização da requisição.
        if (!authHeader) { // Verifica se o cabeçalho de autorização esta ausente.
            return res.status(400).json({ // Retorna um erro 400 (Bad Request) com a mensagem de erro.
                erro: true, // Indica que houve um erro na validação do token.
                mensagem: "Erro! Necessario realizar o login para acessar a pagina!" // Mensagem de erro indicando que o token nao foi enviado.
            });
        };

        const [bearer, token] = authHeader.split(' '); // Divide o cabeçalho de autorização em duas partes: o tipo de autenticação e o token.
           
        if (!token) { // Verifica se o cabeçalho de autorização ou o token estao ausentes.
            return res.status(400).json({ // Retorna um erro 400 (Bad Request) com a mensagem de erro.
                erro: true, // Indica que houve um erro na validação do token.
                mensagem: "Erro! Necessario realizar o login para acessar a pagina!" // Mensagem de erro indicando que o token nao foi enviado.
            });
        };
    
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET); // Verifica se o token e valido usando a chave secreta.
            req.userId = decoded.id; // Extrai o id do usuario do token decodificado.
            req.levelAcess = decoded.levelAcess; // Extrai o nivel de acesso do usuario do token decodificado.
            return next(); // Chama o proximo middleware ou rota se o token for valido.
        } catch (err) {
            return res.status(400).json({ // Retorna um erro 400 (Bad Request) com a mensagem de erro.
                erro: true, // Indica que houve um erro na validação do token.
                mensagem: "Erro! Necessario realizar o login para acessar a pagina!" // Mensagem de erro indicando que o token e invalido.
            });
        }
    }
};