const express = require('express');

const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
const { User } = require('../db');

const { JWT_SECRET } = process.env;

const { checkDuplicateUsernameOrEmail } = require('./middleware/checkUsernameDuplicate');
const { checkIfEmailOrPasswordIsMissing } = require('./middleware/checkIfEmailOrPasswordIsMissing');

app.use(cors({ credentials: true, origin: 'http://localhost:3006' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(checkIfEmailOrPasswordIsMissing);
app.use(checkDuplicateUsernameOrEmail);

app.post('/signout', async (req, res) => {
  try {
    const cookie = req.cookies;
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in cookie) {
      if (cookie.prop) {
        res.cookie(prop, '', { expires: new Date(0) });
      }
    }

    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
});

app.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({
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
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.cookie('token', token);
    res.cookie('userId', user.id);

    return res.status(200).send({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post('/register', async (req, res) => {
  try {
    await User.create({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.send({ message: 'User registered successfully! Please signin now!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
