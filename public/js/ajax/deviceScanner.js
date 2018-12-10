{
    var temp = {};

    $("input[name='device_select']").on('click', function(){
        temp = {};
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

   

    $('.device_input_container').on('change', "input[name='modem_mac']" ,function(){
        temp.modem_mac = $(this).val();
        $("input[name='modem_serial']").focus();
    })
    $(".device_input_container").on('change', "input[name='modem_serial']" ,function(){
        temp.modem_serial = $(this).val();
        $("input[name='modem_mta']").focus()
    })
    $(".device_input_container").on('change', "input[name='modem_mta']", function(){
        temp.modem_mta = $(this).val();
        
        var modem_textarea = $("textarea[name='modem_textarea']");
            modem_textarea.val(modem_textarea.val()+temp.modem_mac+';'+temp.modem_serial+';'+temp.modem_mta+'\n');
        clearModemInputFields();
    })

    function clearModemInputFields(){
        $("input[name='modem_mac']").val('');
        $("input[name='modem_serial']").val('');
        $("input[name='modem_mta']").val('');
        $("input[name='modem_mac']").focus();
    }
}