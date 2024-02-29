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
            $('.text-name-holder-container__span').each(function(index) {
                console.log(doubled[index].name);
                $(this).text(doubled[index].name);
                $(this).parent().parent().find('.text-price-holder-container__span').text(doubled[index].price);
                $(this).parent().parent().parent().find('.lot-photo-holder-container__img').attr('src', doubled[index].image_path);
            });
            response.available_categories.forEach(function(object, index) {
                const to_add = `<div class="category-row-item-container">
                         <div class="square-brackets-container">
                             <span class="square-brackets-container__span">[0${index + 1}]</span>
                         </div>
                        <div class="category-name-container">
                            <span class="category-name-container__span">${object.category.toUpperCase()}</span>
                        </div>
                        <div class="category-items-count-container">
                            <span class="category-items-count-container__span">${object.amount}</span>
                        </div>
                        <div class="link-arrow-container">
                            <span class="link-arrow-container__span">↗</span>
                        </div>
                    </div>`;
                $('.categories-column-holder-container').append(to_add);
            })
        },
        error: function(_, status, err) {
            console.log(status, err);
        }
    })

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
    })
})