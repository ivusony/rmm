{
    var temp = {};

    $("input[name='device_select']").on('click', function(){
        temp = {}; //reseting temp object if tab is changed
        if ($(this).prop('checked', true)) {
            $.ajax({
                url: '/devicescanner/'+$(this).val(),
                method: 'GET',
                data: 'test',
                success: function(data){
                    $('.device_input_container').html(data)
                }
            })
        }
    })
    //modem event callbacks
    const modemEventCallbacks = {
        modem_mac       : function(){
                                temp.modem_mac = $(this).val();
                                $("input[name='modem_serial']").focus();
                            },
        modem_serial    : function(){
                                temp.modem_serial = $(this).val();
                                $("input[name='modem_mta']").focus()
                            },
        modem_mta       : function(){
                                temp.modem_mta = $(this).val();
                                
                                var modem_textarea = $("textarea[name='modem_textarea']");
                                    modem_textarea.val(modem_textarea.val()+temp.modem_mac+';'+temp.modem_serial+';'+temp.modem_mta+'\n');
                                // clearModemInputFields();
                                modemEventCallbacks.clearFields()
                            },
        clearFields     : function(){
                                $("input[name='modem_mac']").val('');
                                $("input[name='modem_serial']").val('');
                                $("input[name='modem_mta']").val('');
                                $("input[name='modem_mac']").focus();
                            }
    }
   
    //modem event handlers
    $('.device_input_container').on('change', "input[name='modem_mac']" , modemEventCallbacks.modem_mac);
    $(".device_input_container").on('change', "input[name='modem_serial']", modemEventCallbacks.modem_serial);
    $(".device_input_container").on('change', "input[name='modem_mta']", modemEventCallbacks.modem_mta);

    

    //stb event callbacks
    const stbEventCallbacks = {
        stb_serial : function(){
            temp.stb_serial = $(this).val();
            $("input[name='stb_casn']").focus();
        },
        stb_casn : function(){
            temp.stb_casn = $(this).val();
            console.log(temp)
        }
    }
    
    //stb event handlers
    $('.device_input_container').on('change', "input[name='stb_serial']" , stbEventCallbacks.stb_serial);
    $('.device_input_container').on('change', "input[name='stb_casn']" , stbEventCallbacks.stb_casn)

}