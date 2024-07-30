const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const app = express();
const port = 3000;

// Testa a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

// Sincronizar os modelos com o banco de dados
sequelize.sync({ force: false }) // Defina force: true para recriar tabelas, o que apaga dados existentes.
    .then(() => {
        console.log('Tabelas sincronizadas.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabelas:', err);
    });

// Configurações do EJS
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Middleware para processar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const categoriasRouter = require('./routes/categorias');
const perguntasRouter = require('./routes/perguntas');

app.use('/', categoriasRouter);
app.use('/', perguntasRouter);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});