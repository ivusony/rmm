module.exports = {
    renderPage: function(req, res, next){
        res.render('stats', {
            currentUser : res.currentUser
        });
    }
}