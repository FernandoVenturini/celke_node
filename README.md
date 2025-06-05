############# AULA 01: INTRODUCAO AO NODE JS (Como criar o primeiro projeto com Node.js) ###########

## SEQUENCIA PARA CRIAR O PROJETO

1) CRIAR O ARQUIVO package.json
## npm init

2) INSTALANDO EXPRESS (Gerencia as requisicoes, rotas e URLs)
## npm install express

3) RODAR O PROJETO:
## node app.js

4) ACESSAR O PROJETO NO NAVEGADOR:
## http://localhost:8080


############# AULA 02: COMO INSTALAR TODAS AS DEPENDENCIAS COM NODE.JS ##########
1) INSTALANDO TODAS AS DEPENDENCIAS NO PROJETO:
## npm install

######################## AULA 03: CARREGAR PROJETO COM NODEMON ##########################################################
1) INSTALANDO NODEMON: Reinicia o servidor sempre que houver alteracao no codigo fonte. A letra 'g' significa globalmente.
## npm install -g nodemon

2) RODAR O PROJETO COM O NODEMON INSTALADO:
## nodemon app.js

########################AULA 04: API ##########################
1) AQUI NAO TEVE AULA. SO FOI EXPLICADO O QUE E API E O QUE FAZ.

###########AULA 05: COMO USAR O INSOMNIA COM NODE.JS ##############
1) INSATLANDO O INSOMNIA:
## Digita no google Insomnia e instala no pc.
## O Insomnia faz uma simulacao de requisicao para um aplicativo.

#######AULA 06: COMO CRIAR O METODO 'GET' NA API E ENVIAR PARAMETRO########

#######AULA 07: CRIANDO METODO POST NA API ########
## Criando uma requisicao(novo registro) com POST na API

#########COMANDOS BASICOS DO MySQL######################
### Instalar o banco de dados MySQL
    ## Verificar o banco de dados MySQL no prompt de comando
        -> mysql -h localhost -u root -p

### Comandos basicos de MySQL:
    ## Criar a base de dados:
        -> create database celke character set utf8mb4 collate utf8mb4_unicode_ci;

### Criar a tabela
CREATE TABLE `users`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(220) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `email` varchar(220) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE= utf8mb4_unicode_ci;

### Selecionar registro no banco de dados:
    -> SELECT id, name, email FROM users;

### Cadastrar registro no banco de dados:
    -> INSERT INTO users (name, email) VALUES ('Cesar', 'cesar@celke.com');     

### Limitar quantidade de registros selecionados no banco de dados:
    -> SELECT id, name, email FROM users LIMIT 3;

### Editar registro do banco de dados
    -> UPDATE users SET name='Cesar 3a',, email='cesar3a@gmail.com.br' WHERE id=3;

### Apagar registro no banco de dados
    -> DELETE FROM users WHERE id=7;

### Sequelize e uma biblioteca JavaScript que facilita o gerenciamento de um banco de dados SQL
    -> npm install --save sequelize 

### Instalar o drive do banco de dados
    -> npm install --save mysql2

