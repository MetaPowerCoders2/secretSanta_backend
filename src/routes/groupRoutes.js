const router = require('express').Router();
const groupControllers = require('../controller/groupController');
const authJwt = require('../middleware/authJwt');

router.post('/', authJwt, groupControllers.create);
router.put('/:groupId', authJwt, groupControllers.update);
router.delete('/:groupId', authJwt, groupControllers.delete);

module.exports = router;
