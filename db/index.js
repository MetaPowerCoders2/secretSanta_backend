const { User } = require('./User');
const { Group } = require('./Group');
const { sequelize, Sequelize } = require('./db');

User.hasMany(Group, { foreignKey: 'adminId' });
Group.belongsTo(User, { foreignKey: 'adminId' });

module.exports = {
  User,
  Group,
  sequelize,
  Sequelize,
};
