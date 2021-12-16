const {Router} = require('express');
const {cities} = require('../controlers/CitiesControlers');

const router = Router();

router.get('/:city',cities);

module.exports = router;