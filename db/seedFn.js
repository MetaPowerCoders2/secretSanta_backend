const bcrypt = require('bcryptjs');
const { sequelize } = require('./db');
const { User } = require('.');
const { users } = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    const createdUsers = [];

    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      createdUsers.push(await User.create({
        email: users[i].email,
        password: bcrypt.hashSync(users[i].password, 8),
        name: users[i].name,
        mobile: users[i].mobile,
      }));
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
