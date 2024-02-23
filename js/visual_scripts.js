$(function() {
    $('.header-buttons-centered__a').on({
        mouseenter: function() {
            $(this).css("text-decoration", "underline")
        },
        mouseleave: function() {
            $(this).css("text-decoration", "none")
        }
    });

    $('.single-product-collected-container').on({
        mouseenter: function() {
            const image_source = $(this).find(".lot-photo-holder-container__img").attr("src");
            const product_name = $(this).find(".text-name-holder-container__span").text();
            const price = $(this).find(".text-price-holder-container__span").text();

            console.log(image_source, product_name, price);

            const cleared = `
                    <div class="lot-photo-holder-container-unblured">
                        <img class="lot-photo-holder-container__img" src=${image_source} alt="">
                    </div>
                    <div class="double-container-holder-unblured">
                        <div class="text-name-holder-container">
                            <span class="text-name-holder-container__span">
                                ${product_name}
                            </span>
                        </div>
                        <div class="text-price-holder-container">
                            <span class="text-price-holder-container__span">
                                ${price}
                            </span>
                        </div>
                    </div>
                </div>`


            $(this).animate({'opacity': 0}, 500, function(){
                $(this).html(cleared).animate({'opacity': 1}, 500);
            });
        },
        mouseleave: function() {
            const image_source = $(this).find(".lot-photo-holder-container__img").attr("src");
            const product_name = $(this).find(".text-name-holder-container__span").text();
            const price = $(this).find(".text-price-holder-container__span").text();

            const blurred = `
                    <div class="lot-photo-holder-container">
                        <img class="lot-photo-holder-container__img" src=${image_source} alt="">
                    </div>
                    <div class="double-container-holder">
                        <div class="text-name-holder-container">
                            <span class="text-name-holder-container__span">
                                ${product_name}
                            </span>
                        </div>
                        <div class="text-price-holder-container">
                            <span class="text-price-holder-container__span">
                                ${price}
                            </span>
                        </div>
                    </div>
                </div>`

            $(this).animate({'opacity': 0}, 400, function(){
                $(this).html(blurred).animate({'opacity': 1}, 400);
            });
        }
    });

    $('.unwrap-the-menu-container__button .unwrap-the-menu-container__span').on('click', function() {
        const menu_vector = ["CATALOG", "ABOUT", "NEWS", "HELP"];
        console.log($(".max-width-mobile-menu-container"));
        if ($(this).parents(".mobile-header").find(".max-width-mobile-menu-container").length === 1) {
            menu_vector.forEach(function(value) {
                const slice = `<div class="mobile-menu-section-container"><button class="mobile-menu-section-container__button">${value}<a class="mobile-menu-section-container__a" href="#"></a></button></div>`;
                $(".max-width-mobile-menu-container").append(slice);
            })
        }
        else {
            $(this).parents(".mobile-header").find(".max-width-mobile-menu-container").empty();
        }
    })
})