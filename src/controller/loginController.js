const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../../db');

const loginController = {
  signout: async (req, res) => {
    try {
      const cookie = req.cookies;
      if (!cookie || !cookie.token) {
        return res.status(400).send('Failed to signout');
      }

      res.clearCookie('token');

      return res.status(200).send({
        message: "You've been signed out!",
      });
    } catch (err) {
      global.logger.error(err);
      return res.status(500).send('Failed to signout');
    }
  },

  signin: async (req, res) => {
    try {
      const user = await User.scope('signin').findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(404).send({
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.cookie('token', token);

      return res.status(200).send({
        id: user.id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        token,
      });
    } catch (error) {
      global.logger.error(error.message);
      return res.status(500).send({ message: 'Failed to signin' });
    }
  },

  register: async (req, res) => {
    try {
      await User.create({
        email: req.body.email,
        name: req.body.name,
        mobile: req.body.mobile,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      res.send({ message: 'User registered successfully! Please signin now!' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to register' });
    }
  },
};

module.exports = loginController;
