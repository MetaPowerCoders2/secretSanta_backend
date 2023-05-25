const router = require('express').Router();
const groupControllers = require('../controller/groupController');
const authJwt = require('../middleware/authJwt');

router.post('/', authJwt, groupControllers.create);

module.exports = router;
