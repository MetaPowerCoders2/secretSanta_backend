const bcrypt = require('bcryptjs');
const { sequelize } = require('./db');
const { User, Group, Member } = require('.');
const { users, groups, members } = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db

    const createdUsers = [];
    await Promise.all(users.map(async (user) => {
      createdUsers.push(await User.create({
        email: user.email,
        password: bcrypt.hashSync(user.password, 8),
        name: user.name,
        mobile: user.mobile,
      }));
    }));

    const createdGroups = [];
    await Promise.all(groups.map(async (group) => {
      const createdGroup = await Group.create(group);
      await createdUsers[0].addGroup(createdGroup);
      await createdGroup.createMember(users[0]);
      createdGroups.push(createdGroup);
    }));

    await Promise.all(createdGroups.map(async (createdGroup) => {
      const groupMembers = await Member.bulkCreate(members);
      await createdGroup.addMembers(groupMembers);
    }));
  } catch (error) {
    global.logger.error(error);
  }
};

module.exports = seed;
