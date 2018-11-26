const User = require('../models/User');
const Message   = require('../models/Message'); 

module.exports = function(){
    return(req, res, next)=>{
        Message.find({}).then((messages)=>{
            res.render('messages', {
                currentUser : res.currentUser,
                msgs: messages
            })
        })
        
    }
}
    
