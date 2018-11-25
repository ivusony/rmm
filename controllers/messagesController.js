const socket         = require('socket.io');

module.exports = function(server){
    return(req, res, next)=>{
        //NOT SENDING THE USERNAME!!!!!!!!!!
        let sender = res.currentUser.username;
        // socket ? console.log('YES IO') : console.log('NO IO');
        const io                = socket(server);
        io.on('connect', (socket)=>{
            console.log('Websocket connection ID ' + socket.id + ' has been established');
            socket.on('chat', (data)=>{
                io.sockets.emit('chat', {
                    sender : sender,
                    message : data.message
                })
            })
           
        })

      
        res.render('messages', {
            currentUser : res.currentUser
        })
        io.on('disconnect', ()=>{
            console.log('DISCONNECTED')
        })
       
    }
}
    
