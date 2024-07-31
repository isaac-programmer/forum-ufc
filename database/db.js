const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projeto_tecweb2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
