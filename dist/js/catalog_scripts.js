$(function() {
    function drop_all_activators(){ // For deactivating styles of all category buttons
        $('.percent15-single-category-holder-container__margined-left').each(function() {
            $(this).children().removeClass($(this).attr('class'));
            $(this).children().addClass('change-items-filter-trigger-button__deactivated');
        })
    }

    $.ajax({
        url : 'http://localhost:8000/catalog/main_landing',
        method : 'GET',
        dataType : 'json',
        headers : {
            'Content-Type' : 'application/json'
        },
        success: function(reply) {
            $('#items-counter').find('.big-catalog__span').text(`${reply.total_items}`);

            $('.text-name-holder-container__span').each(function(index) {
                console.log(reply.all_items[index].name);
                $(this).text(reply.all_items[index].name);
                $(this).parent().parent().find('.text-price-holder-container__span').text(reply.all_items[index].price);
                $(this).parent().parent().parent().find('.lot-photo-holder-container__img').attr('src', reply.all_items[index].image_path);
            });

            reply.list_of_groups.forEach(function(object, index) {
                if (index === 0) {
                    $('.percent60-categories-holder-container').append(`<div class="percent15-single-category-holder-container__margined-left">
                    <button class="change-items-filter-trigger-button__activated" id="all">
                        ALL
                    </button>
                </div>`)
                }
                else {
                    $('.percent60-categories-holder-container').append(`<div class="percent15-single-category-holder-container__margined-left">
                    <button class="change-items-filter-trigger-button__deactivated" id=${object}>
                        ${object.toUpperCase()}
                    </button>
                </div>`)
                }
            });
        },
        error: function(_, status, err) {
            console.log(status, err);
        }
    });

    $('.percent60-categories-holder-container').on('click', '.percent15-single-category-holder-container__margined-left .change-items-filter-trigger-button__deactivated', function() {
        drop_all_activators();
        $(this).removeClass('change-items-filter-trigger-button__deactivated');
        $(this).addClass('change-items-filter-trigger-button__activated');
        $.ajax({
            url : `http://localhost:8000/catalog/${$(this).attr('id')}`,
            method : 'GET',
            dataType : 'json',
            headers : {
                'Content-Type' : 'application/json'
            },
            success: function(object) {
                $('#items-counter').find('.big-catalog__span').text(`${object.length}`);
                $('.text-name-holder-container__span').each(function(index) {
                    console.log(object);
                    console.log(object[index].name);
                    $(this).text(object[index].name);
                    $(this).parent().parent().find('.text-price-holder-container__span').text(object[index].price);
                    $(this).parent().parent().parent().find('.lot-photo-holder-container__img').attr('src', object[index].image_path);
                });
                // Fix the bug with the out-of-range
            },
            error: function(_, status, err) {
                console.log(status, err)
            }
        });
    });

    $('.percent60-categories-holder-container').on('click', '.percent15-single-category-holder-container__margined-left .change-items-filter-trigger-button__activated', function() {

    });

    $('.header-buttons-centered__a, .mobile-menu-section-container__button').on({
        mouseenter: function() {
            $(this).css("text-decoration", "underline");
        },
        mouseleave: function() {
            $(this).css("text-decoration", "none");
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