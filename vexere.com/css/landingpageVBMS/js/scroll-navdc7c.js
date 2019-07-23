$(document).on("scroll", onScroll);

//smoothscroll
$('.nav-links a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $('.nav-links li a').each(function () {
        $(this).removeClass('active');
    });
    $(this).addClass('active');

    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top + 2
    }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
    });
});
function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.nav-links li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
            $('.nav-links li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
        //end position will be active if scroll
        if (scrollPos - $("#contactus").offset().top > -300) {
            $('.nav-links li a').removeClass("active");
            $("#linkcontactus").addClass("active");
        }
    });
}