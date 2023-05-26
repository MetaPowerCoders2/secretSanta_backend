const { User } = require('../../db');

const findUser = async (id) => {
  try {
    return await User.findOne({
      where: { id },
    });
  } catch (error) {
    global.logger.error(error.message);
    return new Error(error.message);
  }
};

module.exports = { findUser };
