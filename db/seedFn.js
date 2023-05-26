const bcrypt = require('bcryptjs');
const { sequelize } = require('./db');
const { User, Group } = require('.');
const { users, groups, members } = require('./seedData');
const randomPairing = require('../src/utils/randomPairing');

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

    members.push({
      name: users[0].name,
      email: users[0].email,
      mobile: users[0].mobile,
    });

    //const createdGroups = [];
    await Promise.all(groups.map(async (group) => {
      randomPairing(members);

      console.log(members);
      const createdGroup = await Group.create(group);
      await createdUsers[0].addGroup(createdGroup);
      await Promise.all(members.map(async (member) => {
        await createdGroup.createMember(member);
      }));
    }));
  } catch (error) {
    global.logger.error(error);
  }
};

module.exports = seed;
