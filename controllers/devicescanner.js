module.exports = {
    renderPage:function(req, res, next){
        res.render('devicescanner', {
            currentUser: req.user
        })
    }
}