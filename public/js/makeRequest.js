(function(global,$){
    $(document).ready(function(){
        //initial setup and behavior
        $('#cpeIP').focus();
        $('#cpeIP').on('paste',function(){
            $('#wCOM').focus();
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
        sendRequest(){
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
                   //populating the hidden textarea
                    $('#request_result').text(data);
                }
            })
        }
        validateInput(){
            for(var key in this){
                this[key] = this[key].trim();
                console.log(this[key]);
            }
        }
    }

    //building an object from input field values and setting the __proto__ link to Request.prototype
    function inputElements (modemIP, writeCOM, cpeIP, modemType){
        const inputs = Object.create(Request.prototype);
        inputs.modemIP      = modemIP;
        inputs.writeCOM     = writeCOM;
        inputs.cpeIP        =   cpeIP;
        inputs.modemType    =   modemType;
        return inputs;
    }
    
    //Event handler callbacks object
    const eventHandlerCallbacks = {
        requestOn   :   function(e){
                            e.preventDefault();
                            const input = inputElements($('#modemIP').val(), $('#wCOM').val(), $('#cpeIP').val(), $('#modemType').val());
                            input.validateInput(); //Request.prototype
                            //If check is passed, constructing new object from the values passed
                            const newRequest = new Request(input.modemIP, input.writeCOM, input.cpeIP, input.modemType, "aquilaOnKey");
                            //then calling the sendrequest method on the newly created object
                            newRequest.sendRequest();
                            //enabling the copy key button
                            $('#aquilaOnKey').prop('disabled', false);
                            $('#request_btn_on').prop('disabled', true);

                            $("#web-interface-tab").prop('target', '_blank');
                            $("#web-interface-tab").prop('href', 'http://'+input.cpeIP+':8080');
                                
                        },
        requestOff  :   function(e){
                            e.preventDefault();
                            const input = inputElements($('#modemIP').val(), $('#wCOM').val(), $('#cpeIP').val(), $('#modemType').val());
                            const newRequest = new Request(input.modemIP, input.writeCOM, input.cpeIP, input.modemType, "aquilaOffKey");
                            newRequest.sendRequest();
                            //disable ON key button
                            $(this).prop('disabled', true);
                            $('#aquilaOffKey').prop('disabled', false);
                        },
        copyOnKey   :   function(e){
                            e.preventDefault();
                            //copy already generated string from textarea
                            new Clipboard('.copy');
                            //disable ON key button
                            $(this).prop('disabled', true);
                            $('#web-interface-window').prop('disabled', false);
                            //changing the request button to off
                            $('#request_btn_holder').html('<button class=" fluid ui red button"  id="request_btn_off">REQUEST OFF</button>');
                            $(this).prop('disabled', true)
                        },
        copyOffKey  :   function(e){
                            e.preventDefault();
                            //copy the new request string from textarea
                            new Clipboard('.copy');
                            //disable OFF key button
                            $(this).prop('disabled', true);
                            $('#request_btn_off').prop('disabled', true);
                            //reset fields
                            $('#remote-page').attr('src', '');
                            $('#web-interface-window').text('Open device web interface');
                            eventHandlerCallbacks.resetFields()
                        },
        openPageBelow    :   function(e){
                            e.preventDefault();
                            $(this).text('Web interface below');
                            $(this).prop('disabled', true);
                            if($('#remote-page').hide()){
                                $('#remote-page').show();
                            }
                            $('#remote-page').attr('src', 'http://'+ $('#cpeIP').val().trim() + ':8080');
                        },
        resetFields :   function(){
                            $('#modemIP').val('');
                            $('#wCOM').val(''); 
                            $('#cpeIP').val('');
                            $('#modemType').val('select');
                            $('#aquilaOffKey').prop('disabled', true);
                            $('#remote-page').hide();
                            $('#web-interface-window').show().attr('disabled', true);
                            $('#request_btn_on').prop('disabled', true);
                            $('#web-interface-window').text('Open device web interface');
                        }
    }
   
     //event handlers
     $('#request_btn_holder').on('click', '#request_btn_on', eventHandlerCallbacks.requestOn);
     $('#request_btn_holder').on('click', '#request_btn_off', eventHandlerCallbacks.requestOff);
     $('#aquilaOnKey').on('click',   eventHandlerCallbacks.copyOnKey);
     $('#aquilaOffKey').on('click', eventHandlerCallbacks.copyOffKey);
     $('#web-interface-window').on('click', eventHandlerCallbacks.openPageBelow);
 

    $('.ui.basic.modal').modal('show');
   
})(window,jQuery)
