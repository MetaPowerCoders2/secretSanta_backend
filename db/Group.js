const { Sequelize, sequelize } = require('./db');

const Group = sequelize.define('group', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maxPrice: Sequelize.FLOAT,
  location: Sequelize.STRING,
  date: Sequelize.DATE,
});

module.exports = { Group };
