const   express     = require('express'),
        router      = express.Router();

const messagesController = require('../controllers/messagesController');
const loginController = require('../controllers/loginController');

module.exports = function(){
    router.get('/messages', loginController.isLoggedIn ,messagesController());
    return router
} 



