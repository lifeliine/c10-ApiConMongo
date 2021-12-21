const {Router} = require('express');
const {getUsers,getUserById,createUser,update,removeUser} = require('../controlers/userControlers');
const {postRequestValidations,putRequestValidations,getRequestValidations,getAllRequestValidations,deleteRequestValidations} = require('../middlewares/users/userValidation');

const router = Router();

router.get('/',getAllRequestValidations,getUsers);
router.get('/:id',getRequestValidations, getUserById);
router.post('/',postRequestValidations,createUser);
router.put('/:id',putRequestValidations, update);
router.delete('/:id',deleteRequestValidations,removeUser);

module.exports = router;