$(function() {
    $.ajax({
        url : 'http://localhost:8000/main',
        method : 'GET',
        dataType : 'json',
        headers : {
            'Content-Type' : 'application/json'
        },
        success: function(response) {
            const doubled = response.random_positions.concat(response.random_positions);
            console.log(doubled);
            doubled.forEach(function(item, index) {
                if (index < 6) {
                    const square_element = `<div class="single-product-collected-container-max-width wow animate__animated animate__zoomInUp">
                    <div class="grid-95-centered-holder-container__left">
                        <span class="grid-name-title__span">${item.brand}</span>
                    </div>
                    <div class="lot-photo-holder-container">
                        <img class="lot-photo-holder-container__img" src=${item.image_path} alt="">
                    </div>
                    <div class="double-container-holder">
                        <div class="text-name-holder-container">
                            <span class="text-name-holder-container__span">
                                ${item.name}
                            </span>
                        </div>
                        <div class="text-price-holder-container">
                            <span class="text-price-holder-container__span">
                                ${item.price} RUB
                            </span>
                        </div>
                    </div></div>`;
                    $('.stock-grid-holder-container').append(square_element);
                }
                else if (index === 6) {
                    const rectangle_template = `<div class="see-all-dark-rectangle-container-full wow animate__animated animate__bounceIn">
                        <button class="see-all-dark-rectangle-container__button">
                            <a class="see-all-dark-rectangle-container__a" href="catalog.html">
                                SEE ALL PRODUCTS ↗
                            </a>
                        </button>
                    </div>`;
                    $('.stock-grid-holder-container').append(rectangle_template);
                }
                else {
                    return 0
                }
            });
            response.available_categories.forEach(function(item, index) {
                const to_add = `<div class="category-row-item-container wow animate__animated animate__bounceInDown"><div class="square-brackets-container"><span class="square-brackets-container__span">[0${index + 1}]</span></div><div class="category-name-container"><span class="category-name-container__span">${item.category.toUpperCase()}</span></div><div class="category-items-count-container"><span class="category-items-count-container__span">${item.amount}</span></div><div class="link-arrow-container"><span class="link-arrow-container__span">↗</span></div></div>`;
                $('.categories-column-holder-container').append(to_add);
            })
        },
        error: function(_, status, err) {
            console.log(status, err);
        }
    })

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

    new WOW().init();
})
