{
    

var messageBody = document.querySelector('#output');



   let pathname = window.location.pathname;
   var socket = io();
  
   
      socket.connect('http://127.0.0.1:3000');
   
    //DOM vars
    let output          = $('#output'),
        message         = $('#message'),
        send_message    = $('#send_message');


        send_message.on('click', sendMessage);

        
        message.on('keypress', function(e){
            let code = e.keyCode || e.which;
            if (code===13) {
                sendMessage()
            }
        })

        function sendMessage(){
            socket.emit('chat', {
                message : message.val()
            })
            message.val('');
            output.animate({ scrollTop: $(this).height() }, "slow");
            return false;
        }
   

    //listenin
    
    socket.on('chat', (data)=>{
       
        output.append(`<p><strong>${data.sender}: </strong>${data.message}</p>`);
        
        
    })
}