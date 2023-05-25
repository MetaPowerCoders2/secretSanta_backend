const { User } = require('../../db');

const findUser = async (user) => {
  try {
    return await User.findOne({
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    global.logger.error(error.message);
  }
};

module.exports = { findUser };
