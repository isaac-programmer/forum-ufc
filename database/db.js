const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projeto_tecweb2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
