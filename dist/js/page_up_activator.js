$(function() { // For displaying the green circle.
    $(window).scroll(function(){
        if ($(this).scrollTop() > 600) {
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function() { // For a smooth scroll to the top of the page.
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop : $(_href).offset().top+"px"});
        return false
    });
})