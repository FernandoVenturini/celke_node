// =======================
// IMPORTS
// =======================
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Sequelize / DB
const db = require("./models/db");
const User = require("./models/User");

// Middleware de autenticação
const { eAdmin } = require("./middlewares/auth");

// =======================
// CONFIGURAÇÃO DO APP
// =======================
const app = express();

app.use(express.json()); // Para receber JSON
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// =======================
// ROTAS DE TESTE
// =======================
app.get("/ping", (req, res) => res.send("pong"));

// =======================
// ROTAS DE USUÁRIO
// =======================

// Listar todos os usuários
app.get("/users", eAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "password"],
      order: [["id", "DESC"]]
    });
    res.json({ erro: false, users });
  } catch {
    res.status(400).json({ erro: true, mensagem: "Erro! Nenhum usuário encontrado!" });
  }
});

// Visualizar usuário por ID
app.get("/user/:id", eAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ erro: true, mensagem: "Usuário não encontrado!" });
    res.json({ erro: false, user });
  } catch {
    res.status(400).json({ erro: true, mensagem: "Erro ao buscar usuário!" });
  }
});

// Criar usuário
app.post("/user", eAdmin, async (req, res) => {
  try {
    const dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    await User.create(dados);
    res.json({ erro: false, mensagem: "Usuário cadastrado com sucesso!" });
  } catch {
    res.status(400).json({ erro: true, mensagem: "Erro! Usuário não cadastrado!" });
  }
});

// Editar usuário
app.put("/user", eAdmin, async (req, res) => {
  const { id } = req.body;
  try {
    await User.update(req.body, { where: { id } });
    res.json({ erro: false, mensagem: "Usuário editado com sucesso!" });
  } catch {
    res.status(400).json({ erro: true, mensagem: "Erro! Usuário não editado!" });
  }
});

// Alterar senha do usuário
app.put("/user-senha", eAdmin, async (req, res) => {
  const { id, password } = req.body;
  try {
    const senhaCrypt = await bcrypt.hash(password, 8);
    await User.update({ password: senhaCrypt }, { where: { id } });
    res.json({ erro: false, mensagem: "Senha editada com sucesso!" });
  } catch {
    res.status(400).json({ erro: true, mensagem: "Erro! Senha não editada!" });
  }
});

// Excluir usuário
app.delete("/user/:id", eAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.json({ erro: false, mensagem: "Usuário excluído com sucesso!" });
  } catch {
    res.status(400).json({ erro: true, mensagem: "Erro! Usuário não excluído!" });
  }
});

// =======================
// LOGIN E TOKEN
// =======================

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }, attributes: ["id", "name", "email", "password"] });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ erro: true, mensagem: "Erro! Usuário ou senha incorreta!" });
  }

  const token = jwt.sign({ id: user.id, levelAcess: 1 }, process.env.SECRET, { expiresIn: "48h" });
  res.json({ erro: false, mensagem: "Login efetuado com sucesso!", token });
});

// Validar token
app.get("/val-token", eAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: ["id", "name", "email"] });
    if (!user) return res.status(404).json({ erro: true, mensagem: "Usuário não encontrado!" });
    res.json({ erro: false, user });
  } catch {
    res.json({ erro: true, mensagem: "Erro! Necessário realizar login para acessar a página!" });
  }
});

// =======================
// RECUPERAÇÃO DE SENHA
// =======================
app.post("/recover-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ erro: true, mensagem: "É necessário informar o e-mail" });

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3f206901ac692f",
        pass: "ae20b9fe8d199d"
      }
    });

    await transport.sendMail({
      from: "devfernandouk@gmail.com",
      to: email,
      subject: "Redefinição de senha",
      text: "Você solicitou alteração de senha.",
      html: "<b>Você solicitou alteração de senha.</b>"
    });

    res.json({ erro: false, mensagem: "E-mail enviado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: true, mensagem: "Erro ao enviar o e-mail" });
  }
});

// =======================
// INÍCIO DO SERVIDOR
// =======================
app.listen(8080, () => {
  console.log("SERVIDOR RODANDO NA PORTA 8080!");
});
