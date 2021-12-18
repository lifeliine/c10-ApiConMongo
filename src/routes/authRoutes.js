const {Router} = require('express');
const {login} = require('../controlers/authControlers');
const {postAuthRequestValidations} = require('../middlewares/auth/authValidation');

const router = Router();

router.post('/login',postAuthRequestValidations,login);


module.exports = router;