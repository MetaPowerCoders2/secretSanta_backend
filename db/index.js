const { User } = require('./User');
const { Group } = require('./Group');
const { Member } = require('./Member');
const { sequelize, Sequelize } = require('./db');

User.hasMany(Group, { foreignKey: 'adminId' });
Group.belongsTo(User, { foreignKey: 'adminId' });

Member.hasOne(Group, { foreignKey: 'groupId' });
Group.belongsTo(Member, { foreignKey: 'groupId' });

module.exports = {
  User,
  Group,
  Member,
  sequelize,
  Sequelize,
};
