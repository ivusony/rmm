(function($){
    $(document).ready(function() {
        var s = window.location.pathname;
        s = s.substr(1), $(".sidebar a").removeClass("active"), $("." + s).addClass("active")
        });
})(jQuery)
    