passport                = require('passport');

module.exports = {
    redirect : function(req, res, next){
        
    },
    renderIndex : function(req, res, next){
        res.render('index')
    }
}