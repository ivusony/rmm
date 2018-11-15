{
    //the object constructor
    class Request{
        constructor(modemip,writecom,cpeip,modemType,requestType){
            this.modemip = modemip,
            this.wc = writecom,
            this.cpeip = cpeip,
            this.modemType = modemType,
            this.requestType = requestType
        }
    }

    Request.prototype.sendRequest = function(){
        $.ajax({
            url: "/newrequest",
            method: "POST",
            data: {
                modemIP:this.modemip,
                wc:this.wc,
                cpeIP:this.cpeip,
                modemType:this.modemType,
                requestType:this.requestType
            },
            dataContent: "application/json",
            success: function(data, status, jqXHR){
                console.log(data);
                console.log(status);
                console.log(jqXHR);
            }
        })
    }
   
    const  request_btn  = $('.request_btn');
    request_btn.on('click', function(e){
        e.preventDefault();
        //checking if any of the input fields provided are empty, and if the select option is blank. If so, returning.
        if ($('#modemIP').val()==='' || $('#wCOM').val()==='' || $('#cpeIP').val() === '' || $('#modemType').val() === 'select') {
            return alert('Error 1.01. Aborting')
        }
        //If check is passed, constructing new object from the values passed
        let newRequest = new Request($('#modemIP').val().trim(), $('#wCOM').val().trim(), $('#cpeIP').val().trim(), $('#modemType option:selected').val(), $(this).attr('id'));
        //then calling th sendrequest method on the newly created object
        newRequest.sendRequest();
        
        resetFields();
    })
    //reset filed function
    function resetFields(){
        $('#modemIP').val('');
        $('#wCOM').val(''); 
        $('#cpeIP').val('');
        $('#modemType').val('select');
    }


    
        
}