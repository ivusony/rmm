{
    $('#login_btn').on('click', function(){
        $.ajax({
            url: '/login',
            method: 'POST',
            data: {
                username: $('input[name=email]').val(),
                password: $('input[name=password]').val()
            }
        })
    })
}