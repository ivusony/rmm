const router = require('express').Router();
const devicescanner = require('../controllers/devicescanner');

        router.get('/devicescanner', devicescanner.renderPage)

module.exports = router;