const {Router} = require('express');
const {getUsers,getUserById,createUser,update,removeUser} = require('../controlers/userControlers');
const {postRequestValidations,putRequestValidations,getRequestValidations,deleteRequestValidations} = require('../middlewares/users/userValidation');

const router = Router();

router.get('/',getUsers);
router.get('/:id',getRequestValidations, getUserById);
router.post('/',postRequestValidations,createUser);
router.put('/:id',putRequestValidations, update);
router.delete('/:id',deleteRequestValidations,removeUser);

module.exports = router;