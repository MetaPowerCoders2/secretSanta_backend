const { Group, Member } = require('../../db');
const { findUser } = require('../middleware/userUtils');

const userController = {
  me: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (user) {
        const groups = await Group.findAll({
          where: {
            adminId: user.id,
          },
          include: {
            model: Member,
            required: true,
          },
        });

        return res.status(200).send({ message: { user, groups } });
      }
      return res.status(404).send({ message: 'User not logged' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to retrieve user data' });
    }
  },
};

module.exports = userController;
