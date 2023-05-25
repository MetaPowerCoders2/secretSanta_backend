const router = require('express').Router();
const userControllers = require('../controller/userController');
const authJwt = require('../middleware/authJwt');

router.get('/me', authJwt, userControllers.me);

module.exports = router;
