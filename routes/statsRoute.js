const   express     = require('express'),
        router      = express.Router();

const statsController = require('../controllers/statsController');
const loginController = require('../controllers/loginController');


router.get('/stats', loginController.isLoggedIn ,statsController.renderPage);


module.exports = router;