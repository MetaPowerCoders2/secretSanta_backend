const router = require('express').Router();
const loginControllers = require('../controller/loginController');

const { checkDuplicateUsernameOrEmail } = require('../middleware/checkDuplicateUsernameOrEmail');
const { checkIfEmailOrPasswordIsMissing } = require('../middleware/checkIfEmailOrPasswordIsMissing');

router.get('/signout', loginControllers.signout);

router.use(checkIfEmailOrPasswordIsMissing);
router.post('/signin', loginControllers.signin);

router.use(checkDuplicateUsernameOrEmail);
router.post('/register', loginControllers.register);

module.exports = router;
