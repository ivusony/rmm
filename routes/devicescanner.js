const router = require('express').Router();
const devicescanner = require('../controllers/devicescanner');
const loginController       =       require('../controllers/loginController');

        router.get('/devicescanner', loginController.isLoggedIn ,devicescanner.renderPage); 
        router.get('/devicescanner/:device', loginController.isLoggedIn ,devicescanner.renderForm)
        

module.exports = router;