const {Router} = require('express');
const {getUsers,getUserById,createUser,update,removeUser} = require('../controlers/userControlers');


const router = Router();

router.get('/',getUsers);
router.get('/:id',getUserById);
router.post('/',createUser);
router.put('/:id',update);
router.delete('/:id',removeUser);

module.exports = router;