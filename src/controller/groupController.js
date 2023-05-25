const { User, Group } = require('../../db');

const groupController = {
  create: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (user) {
        const {
          name, maxPrice, location, date, members,
        } = req.body;

        const group = await Group.create({
          name,
          maxPrice,
          location,
          date,
        });

        await user.addGroup(group);

        await Promise.all(members.map(async (member) => {
          await group.createMember(member);
        }));

        return res.status(200).send(group);
      }
      return res.status(404).send({ message: 'User not logged' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to create group' });
    }
  },
};

module.exports = groupController;
