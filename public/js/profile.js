(function($) {
    var pathname = window.location.pathname;
    if(pathname === '/profile'){
        $('.profile_settings').fadeIn('slow');
    }
    $('#newPass').on('keydown', function() {
        if ($(this).val().length > 0) {
            $('#newPassCheck').prop('disabled', false);
        } else {
            $('#newPassCheck').prop('disabled', true);
        }
    });
    $('#newPassCheck').on('keyup', function() {
        if ($(this).val() !== $('#newPass').val()) {
            $(this).parent().addClass('error');
            $('#update_profile').prop('disabled', true)
        } else {
            $(this).parent().removeClass('error');
            $('#update_profile').prop('disabled', false)
        }
    })
    
})(jQuery)