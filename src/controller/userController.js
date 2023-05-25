const { User, Group, Member } = require('../../db');

const userController = {
  me: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

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
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to retrieve user data' });
    }
  },
};

module.exports = userController;
