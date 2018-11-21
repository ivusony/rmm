passport                = require('passport');

module.exports = {
    
    renderIndex : function(req, res, next){
        res.render('index', {
            //change to full name uppon production
           currentUser : res.currentUser.fullName
        })

    
    }
}