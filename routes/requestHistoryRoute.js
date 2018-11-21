
    const express = require('express'),
        router = express.Router(),
        loginController = require('../controllers/loginController'),
        requestHistoryController = require('../controllers/requestHistoryController');
        

    router.get('/requesthistory', loginController.isLoggedIn,requestHistoryController.renderpage);


    module.exports = router;
