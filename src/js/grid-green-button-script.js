$(function() {
    $('.grid-holder-container').on('mouseenter', '.single-product-collected-container-max-width', function() {
        const direct_link = `concrete_view.html?item=${$(this).attr('item-id')}` // REWRITE THIS PIECE!
        const buy_button = `<div class="green-buy-button-container wow animate__animated animate__fadeInUp"><a href=${direct_link} class="buy-button-item">VIEW MORE</a></div>`
        $(this).append(buy_button);
    });

    $('.grid-holder-container').on('mouseleave', '.single-product-collected-container-max-width', function() {
        $(this).find(".green-buy-button-container").fadeTo(200, 0.01, function() {
            $(this).slideUp(200, function() {
                $(this).remove();
            })
        })
    });
})