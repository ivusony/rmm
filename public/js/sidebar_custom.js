{
//    $('.sidebar a').on('click', function(){
//        $('.sidebar a').removeClass('active');
//        $(this).addClass('active');
//    })

   var pathname = window.location.pathname;
   pathname = pathname.substr(1);
   
   $('.sidebar a').removeClass('active');
   $('#'+pathname).addClass('active')
}