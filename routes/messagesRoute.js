const   express     = require('express'),
        router      = express.Router();

const messagesController = require('../controllers/messagesController');
const loginController = require('../controllers/loginController');

module.exports = function(server){
    router.get('/messages', loginController.isLoggedIn ,messagesController(server));
    return router
} 



