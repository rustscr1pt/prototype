$(function() {
    $('.header-buttons-centered__a, .mobile-menu-section-container__button').on({
        mouseenter: function() {
            $(this).css("text-decoration", "underline");
        },
        mouseleave: function() {
            $(this).css("text-decoration", "none");
        }
    });
})