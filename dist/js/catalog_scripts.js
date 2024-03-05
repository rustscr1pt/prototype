$(function() {
    function drop_all_activators(){ // For deactivating styles of all category buttons
        $('.percent15-single-category-holder-container__margined-left').each(function() {
            $(this).children().removeClass($(this).attr('class'));
            $(this).children().addClass('change-items-filter-trigger-button__deactivated');
        })
    }
    function clear_grid_elements() { // func for clearing the child elements from grid-holder
        const object_oriented = document.getElementsByClassName('grid-holder-container')[0];
        while (object_oriented.firstChild) {
            object_oriented.firstChild.remove();
        }
    }
    function spawn_categories_buttons(list) { // For spawning buttons to sort items by categories.
        $('.percent60-categories-holder-container').append(`<div class="percent15-single-category-holder-container__margined-left">
                    <button class="change-items-filter-trigger-button__activated" id="all">
                        ALL
                    </button>
                </div>`);

        list.forEach(function(object, _) {
            $('.percent60-categories-holder-container').append(`<div class="percent15-single-category-holder-container__margined-left">
                   <button class="change-items-filter-trigger-button__deactivated" id=${object}>
                       ${object.toUpperCase()}
                   </button>
                </div>`)
        })
    }
    function spawn_grid_boxes(items_vector) { // Add boxes with items to the grid container
        for (object of items_vector) {
            const template = `<div class="single-product-collected-container-max-width wow animate__animated animate__rubberBand">
                    <div class="grid-95-centered-holder-container__left">
                        <span class="grid-name-title__span">${object.brand}</span>
                    </div>
                    <div class="lot-photo-holder-container">
                        <img class="lot-photo-holder-container__img" src=${object.image_path} alt="">
                    </div>
                    <div class="double-container-holder">
                        <div class="text-name-holder-container">
                            <span class="text-name-holder-container__span">
                                ${object.name}
                            </span>
                        </div>
                        <div class="text-price-holder-container">
                            <span class="text-price-holder-container__span">
                                ${object.price} RUB
                            </span>
                        </div>
                    </div>
                </div>`

            $('.grid-holder-container').append(template);
        }
    }
    function refresh_counter(number) { // change counter in the square brackets
        document.getElementById("items-counter").remove();
        $(`<span class="big-catalog__span wow animate__animated animate__fadeInDownBig" id="items-counter">${number}</span>`).insertAfter("#left-bracket-anchor");
    }

    function starting_main_request() { // Request for getting data when the page appeared.
        $.ajax({
            url : 'http://localhost:8000/catalog/main_landing',
            method : 'GET',
            dataType : 'json',
            headers : {
                'Content-Type' : 'application/json'
            },
            success: function(reply) {
                refresh_counter(reply.total_items);
                spawn_grid_boxes(reply.all_items);
                spawn_categories_buttons(reply.list_of_groups);
            },
            error: function(_, status, err) {
                console.log(status, err);
            }
        });
    }

    starting_main_request();

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
                refresh_counter(object.length);
                clear_grid_elements();
                spawn_grid_boxes(object);
            },
            error: function(_, status, err) {
                console.log(status, err)
            }
        });
    });

    // $('.percent60-categories-holder-container').on('click', '.percent15-single-category-holder-container__margined-left .change-items-filter-trigger-button__activated', function() {
    //     starting_main_request(); // when active button of filter is clicked second time - reset all filters
    // });

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