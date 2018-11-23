const express = require('express'),
router = express.Router();

const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');


router.get('/index', loginController.isLoggedIn , indexController.showWelcome ,indexController.renderIndex);
// router.get('*', loginController.isLoggedIn , indexController.renderIndex);

module.exports = router;