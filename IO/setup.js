{    
    const socket    = require('socket.io');
    const User      = require('../models/User'); 
    const Message   = require('../models/Message'); 
    const timestamp = require('../scripts/Timestamp');

    module.exports = function(server){
    const io = socket(server);
        io.on('connect', function(socket){
            // console.log(socket.id);
            socket.on('chat', function(data){
                User.findById({_id:data.id}).then((user)=>{
                    Message.create({UID:user.username, BODY: data.message, TIMESTAMP: timestamp.format()}, function(err, message){
                        if (err) {
                            console.log(err)
                        }
                    });
                    io.sockets.emit('chat', {
                        user : user.username,
                        message : data.message,
                        time: timestamp.format()
                    })
                });
            })
            return io;
        })
    }
}