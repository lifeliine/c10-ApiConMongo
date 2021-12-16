const {Router} = require('express');
const {weatherByCoordinates,weatherByCityId} = require('../controlers/weatherControlers');


const router = Router();

router.get('/',weatherByCoordinates);
router.get('/:city/:id',weatherByCityId);



module.exports = router;