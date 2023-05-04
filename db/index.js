const { User } = require('./User');
const { Group } = require('./Group');
const { Member } = require('./Member');
const { sequelize, Sequelize } = require('./db');

User.hasMany(Group, { foreignKey: 'adminId' });
Group.belongsTo(User, { foreignKey: 'adminId' });

Group.hasMany(Member, { foreignKey: 'groupId' });
Member.belongsTo(Group, { foreignKey: 'groupId' });

module.exports = {
  User,
  Group,
  Member,
  sequelize,
  Sequelize,
};
