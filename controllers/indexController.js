passport                = require('passport');

module.exports = {
    redirect : function(req, res, next){
        
    },
    renderIndex : function(req, res, next){
        res.render('index', {
            //change to full name uppon production
           currentUser : res.currentUser.fullName
        })

    
    }
}