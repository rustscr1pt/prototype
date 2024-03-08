$(function() {
    function fill_main_actor(main_actor) { // Fills the page with main information
        const template = `<div class="left-image-half-grid wow animate__animated animate__rotateInDownLeft">
                    <img class="inner-left-grid-image" src=${main_actor.image_path}>
                </div>
                <div class="basic-info-grid">
                    <div class="margin-top-custom"></div>
                    <div class="left-aligned-text wow animate__animated animate__slideInRight">
                        <span class="bold-title">${main_actor.brand} ${main_actor.name}</span>
                    </div>
                    <div class="left-aligned-text wow animate__animated animate__slideInRight">
                        <span class="regular-price">${main_actor.price} RUB</span>
                    </div>
                    <div class="margin-top-custom__4"></div>
                    <div class="left-aligned-text wow animate__animated animate__slideInRight">
                        <span class="regular-description">${main_actor.description}</span>
                    </div>
                    <div class="margin-top-custom__4"></div>
                    <div class="options-concrete-grid wow animate__animated animate__slideInRight">
                        <button class="option-button-active"><span class="option-button-active__span">N/A</span></button>
                    </div>
                    <div class="margin-top-custom__4"></div>
                    <div class="centered-justified-wrapper wow animate__animated animate__slideInRight">
                        <button class="option-button-order"><span class="option-button-order__span">ORDER</span></button>
                    </div>
                    <div class="margin-top-custom__4"></div>
                    <div class="underlined-wrapped-activator wow animate__animated animate__slideInRight">
                        <div class="left-text-and-right-clicker">
                            <div class="left-aligned-text">
                                <span class="bold-burger-menu">Additional info</span>
                            </div>
                            <button class="burger-sleeping">▼</button>
                        </div>
                        <div class="margin-top-custom__2"></div>
                        <div class="bottom-underlined-stamp"></div>
                    </div>
                </div>
            </div>`;

        $('.concrete-grid-12-12').append(template);
    }

    function fill_bottom_grid(recommended_vector) {
        recommended_vector.forEach(function(object) {
            const grid_bottom_template = `<div class='single-product-collected-container-max-width wow animate__animated animate__rubberBand' item-id=${object.id}>
                <div class=" grid-95-centered-holder-container__left">
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
            </div>`;
            $('.recommendations-grid-bottom').append(grid_bottom_template);
        });
    }

    let querystring = location.search.substring(1).split("=")[1]; // Get an id of item before making a request
    console.log(querystring);
    $.ajax({
        url : `http://localhost:8000/concrete/${querystring}`,
        method : "GET",
        dataType : "json",
        headers : {
            'Content-Type' : 'application/json'
        },
        success: function(reply) {
            fill_main_actor(reply.item)
            fill_bottom_grid(reply.recommendations)
        },
        error(_ , status, err) {
            console.log(status, err)
        }
    });
})