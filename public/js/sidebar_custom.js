$(document).ready(function() {
    // $(window).width() < 500 ? e() : i(), $(window).on("resize", function() {
    //     $(window).width() < 500 ? e() : i()
    // });
    var s = window.location.pathname;

    // function e() {
    //     $(".sidebar").css({
    //         left: "-137px"
    //     }), $(".pusher").css({
    //         left: "-137px"
    //     })
    // }

    // function i() {
    //     $(".sidebar").css({
    //         left: "0px"
    //     }), $(".pusher").css({
    //         left: "0px"
    //     })
    // }
    s = s.substr(1), $(".sidebar a").removeClass("active"), $("#" + s).addClass("active")
});