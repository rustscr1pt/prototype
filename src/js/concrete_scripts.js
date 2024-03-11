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
class CartMainActor {
    constructor(id, name, brand, description, group_type, price, image_path, available_quantity, width_mm, height_mm, weight_piece_grams) {
        this.id = id
        this.name = name
        this.brand = brand
        this.description = description
        this.group_type = group_type
        this.price = price
        this.image_path = image_path
        this.available_quantity = available_quantity
        this.width_mm = width_mm
        this.height_mm = height_mm
        this.weight_piece_grams = weight_piece_grams
    }
    release_self_json() {
        return {
            "id" : this.id,
            "name" : this.name,
            "brand" : this.brand,
            "description" : this.description,
            "group_type" : this.group_type,
            "price" : this.price,
            "image_path" : this.image_path,
            "available_quantity" : this.available_quantity,
            "width_mm" : this.width_mm,
            "height_mm" : this.height_mm,
            "weight_piece_grams" : this.weight_piece_grams
        }
    }
    return_weight() {
        return `Weight : ${this.weight_piece_grams}`
    }
    return_width() {
        return `Width : ${this.width_mm}`
    }
    return_height() {
        return `Height : ${this.height_mm}`
    }
    release_vec() {
        return [`Height : [${this.height_mm} mm]`, `Width : [${this.width_mm} mm]`, `Weight : [${this.weight_piece_grams} grams]`]
    }
}

$(function() {
    let querystring = location.search.substring(1).split("=")[1]; // Get an id of item before making a request
    console.log(querystring);
    let main_item_cart_actor;

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
            const main_object = reply.item;
            main_item_cart_actor = new CartMainActor(main_object.id, main_object.name, main_object.brand,
                main_object.description, main_object.group_type, main_object.price, main_object.image_path,
                main_object.available_quantity, main_object.width_mm, main_object.height_mm,
                main_object.weight_piece_grams); // A COPY OF THE MAIN OBJECT IS CREATED.
        },
        error(_ , status, err) {
            console.log(status, err)
        }
    });

    $(".burger-sleeping").on('click', function() {
        switch ($(this).innerHTML) {
            case "▼":
                $(this).innerHTML = "▲";
                $(this).parent().append(`<div class="left-aligned-text wow animate__animated animate__lightSpeedInRight">
                                <span class="bold-burger-menu">${main_item_cart_actor.return_width()}</span>
                            </div>`)
                $(this).parent().append(`<div class="left-aligned-text wow animate__animated animate__lightSpeedInRight">
                                <span class="bold-burger-menu">${main_item_cart_actor.return_height()}</span>
                            </div>`)
                $(this).parent().append(`<div class="left-aligned-text wow animate__animated animate__lightSpeedInRight">
                                <span class="bold-burger-menu">${main_item_cart_actor.return_weight()}</span>
                            </div>`)
            case "▲":
                $(this).innerHTML = "▼";
                document.querySelectorAll(".left-aligned-text").forEach(function(element) {
                    element.remove();
                })
        }
    })

    $(".concrete-grid-12-12").on('click', ".basic-info-grid .underlined-wrapped-activator .left-text-and-right-clicker .burger-sleeping", function() {
        $(this).remove();
        const fold_template = `<button class="burger-active">▲</button>`;
        $(".left-text-and-right-clicker").append(fold_template);
        main_item_cart_actor.release_vec().forEach(function(object, index) {
            setTimeout(function() {
                const wrapper = `<div class="left-aligned-text-additional wow animate__animated animate__fadeInRightBig">
                                <span class="additional-span-styling">${object}</span>
                            </div>`;
                $(".left-text-and-right-clicker").after(wrapper);
            }, 50 * (index + 1));
        })
    })

    $(".concrete-grid-12-12").on('click', ".basic-info-grid .underlined-wrapped-activator .left-text-and-right-clicker .burger-active", function() {
        $(this).remove();
        const fold_template = `<button class="burger-sleeping">▼</button>`;
        $(".left-text-and-right-clicker").append(fold_template);
        for (let step = 0; step < 3; step++) {
            setTimeout(function() {
                $(".left-aligned-text-additional").fadeTo(200, 0.01, function() {
                    $(this).slideUp(200, function() {
                        $(this).remove();
                    })
                })
            }, 350 * (step + 1));
        }
    });

    function cart_checker(ready_template) {
        let refreshed = JSON.parse(sessionStorage.getItem('cart'));
        console.log(refreshed);
        console.log(ready_template);
        var i;
        for (i = 0; i < refreshed.contents.length; i++) {
            if (JSON.stringify(refreshed.contents[i]) === JSON.stringify(ready_template)) {
                console.log('true');
                return true
            }
        }
        console.log('false');
        return false
    }

    $(".concrete-grid-12-12").on('click', ".basic-info-grid .centered-justified-wrapper .option-button-order", function() {
        let template_cart_object = {
            "item" : main_item_cart_actor.release_self_json(),
            "quantity" : 1,
            "total_price" : 0,
            "total_weight_grams" : 0
        };
        template_cart_object.total_price = template_cart_object.quantity * template_cart_object.item.price;
        template_cart_object.total_weight_grams = template_cart_object.quantity * template_cart_object.item.weight_piece_grams;

        sessionStorage.setItem('cart', JSON.stringify({"contents" : [template_cart_object]}));
        cart_checker(template_cart_object);
    })
})