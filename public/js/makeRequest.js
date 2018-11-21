{
    $(document).ready(function(){
        $('#cpeIP').focus();
        $('#cpeIP').on('paste',function(){
            $('#wCOM').focus();
            // e.stopPropagation();
        })
        $('#wCOM').on('paste',function(){
            $('#modemIP').focus()
        })
        $('#modemIP').on('paste',function(){
            $('#modemType').focus();
        })
        $('#modemType').change(function(){
            $('#request_btn_holder').html('<button class=" fluid ui red button"  id="request_btn_on">REQUEST ON</button>')
        });
    })
    
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
    $('#request_btn_holder').on('click', '#request_btn_on', function(e){
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
        $('#request_btn_on').prop('disabled', true);
             
    })
    $('#request_btn_holder').on('click', '#request_btn_off' ,function(e){
        console.log('BTN OFFFFFF')
        e.preventDefault();
            //copy already generated string from textarea
            //make new request with the offkey parameter
            let newRequest2 = new Request($('#modemIP').val().trim(), $('#wCOM').val().trim(), $('#cpeIP').val().trim(), $('#modemType option:selected').val(), "aquilaOffKey");
            newRequest2.sendRequest();
            //disable ON key button
            $(this).prop('disabled', true);
            // $('#aquilaOnKey').prop('disabled', true);
            $('#aquilaOffKey').prop('disabled', false);
    })
    $('#aquilaOnKey').on('click', function(e){
        e.preventDefault();
            //copy already generated string from textarea
            new Clipboard('.copy');
            //make new request with the offkey parameter
            //disable ON key button
            $(this).prop('disabled', true);
            //enable OFF key button
            // $('#aquilaOffKey').prop('disabled', false);
            $('#web-interface').prop('disabled', false);
            $('#request_btn_holder').html('<button class=" fluid ui red button"  id="request_btn_off">REQUEST OFF</button>');
            $(this).prop('disabled', true)
    })
    $('#aquilaOffKey').on('click', function(e){
        e.preventDefault();
            //copy the new request string from textarea
            new Clipboard('.copy');
            //disable OFF key button
            $(this).prop('disabled', true);
            $('#request_btn_off').prop('disabled', true);
            //reset fields
            $('#remote-page').attr('src', '');
            $('#web-interface').text('Open device web interface');
            resetFields();
    })
    $('#web-interface').click(function(e){
        e.preventDefault();
        $(this).text('Web interface below');
        $(this).prop('disabled', true);
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
        $('#request_btn_on').prop('disabled', true);
        $('#web-interface').text('Open device web interface');
        
    }
}