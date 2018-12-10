const router = require('express').Router();
const devicescanner = require('../controllers/devicescanner');

        router.get('/devicescanner', devicescanner.renderPage); 
        router.get('/devicescanner/:device', devicescanner.renderForm)
        

module.exports = router;