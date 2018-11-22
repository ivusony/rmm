const express = require('express'),
        router = express.Router(),
        loginController = require('../controllers/loginController'),
        profileController = require('../controllers/profileController')
        User               = require('../models/User');


        router.get('/profile', loginController.isLoggedIn ,profileController.renderPage);
        router.put('/updateprofile', loginController.isLoggedIn, profileController.updateProfile);



        module.exports = router;