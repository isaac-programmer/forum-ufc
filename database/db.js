const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projeto_tecweb2', 'root', 'Walisson_PS07*', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
