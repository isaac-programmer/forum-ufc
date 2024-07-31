const db = require('./models');

async function syncDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar todos os modelos
    await db.sequelize.sync({ force: false });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

module.exports = syncDatabase;
