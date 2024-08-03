const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const syncDatabase = require('./database/sync');

// Importar rotas
const categoriasRouter = require('./routes/categorias');
const perguntasRouter = require('./routes/perguntas');

// Sincronizar o banco de dados
(async () => {
  await syncDatabase();
  console.log('Banco de dados sincronizado.');
})();

// Configurações do EJS
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Middleware para processar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use('/', categoriasRouter);
app.use('/', perguntasRouter);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
