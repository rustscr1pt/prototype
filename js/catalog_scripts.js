$(function() {
    $('.header-buttons-centered__a, .mobile-menu-section-container__button').on({
        mouseenter: function() {
            $(this).css("text-decoration", "underline")
        },
        mouseleave: function() {
            $(this).css("text-decoration", "none")
        }
    });

    $(".unwrap-the-menu-container__button, .unwrap-the-menu-container__span").on('click', function() {
        const selector = $(".max-width-mobile-menu-container").css("display");
        if (selector === "flex") {
            $(".max-width-mobile-menu-container").fadeOut("fast", function() {
                $(this).css("display", "none");
            });
        }
        else {
            $(".max-width-mobile-menu-container").fadeIn("slow", function() {
                $(this).css("display", "flex");
            });
        }
    });
})