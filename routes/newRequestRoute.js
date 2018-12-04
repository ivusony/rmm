const   express = require('express'),
        router = express.Router(),
        newRequestController = require('../controllers/newRequestController'),
        copyOffController = require('../controllers/copyOffController');


router.post('/newrequest', newRequestController.newRequest, newRequestController.callOids, newRequestController.saveRequest ,newRequestController.generateString);
router.post('/copyoff', copyOffController.copyOff)

module.exports = router;