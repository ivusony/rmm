module.exports = {
    renderPage : function(req, res, next){
        res.render('messages', {
            currentUser : res.currentUser
        })
    }
}