const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./Usuario');

class Pergunta extends Model {}
Pergunta.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pergunta: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'usuario_id'
  },
  categoria: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'data_criacao'
  }
}, {
  sequelize,
  modelName: 'Pergunta',
  tableName: 'perguntas',
  timestamps: false
});

class Resposta extends Model {}
Resposta.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  resposta: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pergunta_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'pergunta_id'
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'usuario_id'
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'data_criacao'
  }
}, {
  sequelize,
  modelName: 'Resposta',
  tableName: 'respostas',
  timestamps: false
});

Pergunta.hasMany(Resposta, {
  foreignKey: 'pergunta_id',
  as: 'respostas'
});

Resposta.belongsTo(Pergunta, {
  foreignKey: 'pergunta_id',
  as: 'perguntas'
});

Resposta.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuarios'
});

Pergunta.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuarios'
});

class Like extends Model {}
Like.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  resposta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Resposta,
      key: 'id'
    }
  },
  tipo: {
    type: DataTypes.ENUM('like', 'dislike'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Like',
  tableName: 'likes',
  timestamps: false
});

Resposta.hasMany(Like, { foreignKey: 'resposta_id', as: 'userInteractions' });
Usuario.hasMany(Like, { foreignKey: 'usuario_id', as: 'userLikes' });

module.exports = {
  Pergunta,
  Resposta,
  Like
};
