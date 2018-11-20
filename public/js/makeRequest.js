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
                modemIP     :   this.modemip,
                wc          :   this.wc,
                cpeIP       :   this.cpeip,
                modemType   :   this.modemType,
                requestType :   this.requestType
            },
            dataContent: "application/json",
            success: function(data, status, jqXHR){
                //do something with returned key
                // console.log(data);
                //insert returned string into element
                //need to be textarea element in order for the copy to work
                $('#request_result').text(data);
            }
        })
    }
    //the first request for the ON key is made when the dropdown menu change is triggered
    $('#modemType').change(function(e){
        e.preventDefault();
        //checking if any of the input fields provided are empty, and if the select option is blank. If so, returning.
        if ($('#modemIP').val()==='' || $('#wCOM').val()==='' || $('#cpeIP').val() === '' || $('#modemType').val() === 'select') {
            return alert('Error 1.01. Aborting')
        }
        //If check is passed, constructing new object from the values passed
        let newRequest = new Request($('#modemIP').val().trim(), $('#wCOM').val().trim(), $('#cpeIP').val().trim(), $('#modemType option:selected').val(), "aquilaOnKey");
        //then calling the sendrequest method on the newly created object
        newRequest.sendRequest();
        //enabling the copy key button
        $('#aquilaOnKey').prop('disabled', false);            
    })

    $('#aquilaOnKey').on('click', function(e){
        e.preventDefault();
            //copy already generated string from textarea
            new Clipboard('.copy');
            //make new request with the offkey parameter
            let newRequest2 = new Request($('#modemIP').val().trim(), $('#wCOM').val().trim(), $('#cpeIP').val().trim(), $('#modemType option:selected').val(), "aquilaOffKey");
            newRequest2.sendRequest();
            //disable ON key button
            $(this).prop('disabled', true);
            //enable OFF key button
            $('#aquilaOffKey').prop('disabled', false);
            $('#web-interface').attr('disabled', false)
    })
    $('#aquilaOffKey').on('click', function(e){
        e.preventDefault();
            //copy the new request string from textarea
            new Clipboard('.copy');
            //disable OFF key button
            $(this).prop('disabled', true);
            //reset fields
            $('#remote-page').attr('src', '');
            resetFields();
    })
    $('#web-interface').click(function(e){
        e.preventDefault();
        $(this).hide();
        if($('#remote-page').hide()){
            $('#remote-page').show();
        }
        $('#remote-page').attr('src', 'http://'+ $('#cpeIP').val().trim() + ':8080');
    });   
    function resetFields(){
        $('#modemIP').val('');
        $('#wCOM').val(''); 
        $('#cpeIP').val('');
        $('#modemType').val('select');
        $('#aquilaOffKey').prop('disabled', true);
        $('#remote-page').hide();
        $('#web-interface').show().attr('disabled', true);
    }
}