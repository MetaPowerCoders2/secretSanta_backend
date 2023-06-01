require('dotenv-flow').config();
require('./src/utils/logger');

const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { ORIGINS } = process.env;

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/login', require('./src/routes/loginRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/group', require('./src/routes/groupRoutes'));

module.exports = app;
