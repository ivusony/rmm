const express = require('express'),
router = express.Router(),
newRequestController = require('../controllers/newRequestController');


router.post('/newrequest', newRequestController.newRequest, newRequestController.callOids);

module.exports = router;