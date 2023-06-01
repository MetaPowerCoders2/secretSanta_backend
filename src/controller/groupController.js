const { User, Group, Member } = require('../../db');
const { findUser } = require('../middleware/userUtils');
const randomPairing = require('../utils/randomPairing');
const { createAccount, generateConfig, sendEmail } = require('../utils/emailUtils');

const groupController = {
  create: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (user) {
        const {
          name, maxPrice, location, date, members,
        } = req.body;

        if (members.length > 1) {
          randomPairing(members);
        }

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

  update: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (user) {
        const { groupId } = req.params;
        const {
          name, maxPrice, location, date, members,
        } = req.body;

        const group = await Group.findOne({
          where: {
            id: groupId,
          },
        });

        if (user.id === group.adminId) {
          const updatedGroup = await group.update({
            name,
            maxPrice,
            location,
            date,
          });

          const existingMembers = await group.getMembers();
          await Promise.all(existingMembers.map(async (existingMember) => {
            await existingMember.destroy();
          }));

          if (members.length > 1) {
            randomPairing(members);
          }

          await Promise.all(members.map(async (member) => {
            await updatedGroup.createMember(member);
          }));

          return res.status(200).send(updatedGroup);
        }
        return res.status(403).send({ message: 'User is not the group admin' });
      }
      return res.status(404).send({ message: 'User not logged' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to update group' });
    }
  },

  delete: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (user) {
        const { groupId } = req.params;

        const group = await Group.findOne({
          where: {
            id: groupId,
          },
        });

        if (user.id === group.adminId) {
          const existingMembers = await group.getMembers();
          await Promise.all(existingMembers.map(async (existingMember) => {
            await existingMember.destroy();
          }));

          await group.destroy();

          return res.status(200).send({ message: 'Group deleted successfuly' });
        }
        return res.status(403).send({ message: 'User is not the group admin' });
      }
      return res.status(404).send({ message: 'User not logged' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to delete group' });
    }
  },

  send: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (user) {
        const { groupId } = req.params;
        const group = await Group.findOne({
          where: {
            id: groupId,
          },
          include: [{
            model: Member,
            required: true,
          },
          {
            model: User,
            required: true,
          },
          ],
        });

        if (user.id === group.adminId) {
          // const transporter = await createAccount();

          // const existingMembers = await group.getMembers();
          // await Promise.all(existingMembers.map(async (existingMember) => {
          //   await existingMember.destroy();
          // }));

          // if (members.length > 1) {
          //   randomPairing(members);
          // } else {
          //   return res.status(403).send({ message: 'Enter at least 2 participants' });
          // }

          // await Promise.all(members.map(async (member) => {
          //   await group.createMember(member);
          //   const config = generateConfig(group, member);
          //   await sendEmail(transporter, config);
          // }));

          const transporter = await createAccount();
          const { members } = group;
          await Promise.all(members.map(async (member) => {
            const config = generateConfig(group, member);
            await sendEmail(transporter, config);
          }));

          return res.status(200).send({ message: 'Emails send successfully.' });
        }
        return res.status(403).send({ message: 'User is not the group admin' });
      }
      return res.status(404).send({ message: 'User not logged' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to send emails.' });
    }
  },
};

module.exports = groupController;
