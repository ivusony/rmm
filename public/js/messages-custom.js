(function($){
    $(document).ready(function(){

   

        var messageBody = document.querySelector('#output');



        let pathname = window.location.pathname;
        var socket = io();
        
        
            socket.connect('http://localhost:3000/', { transports: ['websocket'], upgrade: false });
        
            //DOM vars
            let output          = $('#output'),
                message         = $("input[name='message']"),
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
                        id:message.prop('id'),
                        message : message.val()
                    })
                    message.val('');
                    output.animate({ scrollTop: $(this).height() }, "slow");
                    return false;
                }
        

            //listenin
            
            socket.on('chat', (data)=>{
            
                output.append(`<p class="new_message"><strong>${data.user}:    </strong>${data.message}<span style="float:right">${data.time}</span></p>`);
                
                
            })

        })     
})(jQuery)       
