const   express     = require('express'),
        router      = express.Router();

const messagesController = require('../controllers/messagesController');
const loginController = require('../controllers/loginController');


router.get('/messages', loginController.isLoggedIn ,messagesController.renderPage);


module.exports = router;