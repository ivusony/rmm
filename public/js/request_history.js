;(function(global, $){
    function Credentials(cpe,wc,mip, type){
        this.cpe = cpe;
        this.wc = wc;
        this.mip = mip;
        this.type = type;
    }
    Credentials.prototype.sendRequest = function(){
       
            $.ajax({
                url: "/newrequest",
                method: "POST",
                data: {
                    modemIP     :   this.mip,
                    wc          :   this.wc,
                    cpeIP       :   this.cpe,
                    modemType   :   this.type,
                    requestType :   'aquilaOffKey'
                },
                dataContent: "application/json",
                success: function(data, status, jqXHR){
                    //do something with returned key
                    // console.log(data);
                    //insert returned string into element
                    //need to be textarea element in order for the copy to work
                    
                    $('#request_result').text(data);
                    $('.off_container').html('<div class="ui red tiny button" id="off_key">Off key</div>'); 
                }
            })
      
        
    }

    //CONTINUE HERE!!!!!
    $('.still_on').on('click', function(){
       $(this).find('.copy_off_key').prop('disabled', false);
       $(this).find('.copy_off_key').text('Copy key!');
        var cpe = $(this).find('td.cpeip').html(),
            wc  = $(this).find('td.wc').html(),
            mip = $(this).find('td.modemip').html(),
            type = $(this).find('td.type').html();

        var newRequest = new Credentials(cpe, wc, mip, type);
        
        newRequest.sendRequest();
    })
    $('.copy_off_key').on('click', function(e){
        e.preventDefault();
        new Clipboard('.copy');
       location.reload();
    })

})(window, jQuery)
    
   

