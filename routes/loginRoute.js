{
    const express = require('express'),
        router = express.Router(),
        loginController = require('../controllers/loginController');
        const indexController = require('../controllers/indexController');


        
        router.get('/', loginController.redirect);
        router.get('/login', loginController.isLoggedIn, indexController.renderIndex)
        
        router.post('/login', loginController.authUser);
        router.get('/logout', loginController.isLoggedIn , loginController.logout);

        module.exports = router;
}