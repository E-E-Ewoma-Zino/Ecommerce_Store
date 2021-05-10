(function ($) {
    "use strict";

    $('.popup-youtube, .popup-vimeo').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });



    var review = $('.textimonial_iner');
    if (review.length) {
        review.owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            nav: false,
            responsive: {
                0: {
                    margin: 15,

                },
                600: {
                    margin: 10,
                },
                1000: {
                    margin: 10,
                }
            }
        });
    }
    var best_product_slider = $('.best_product_slider');
    if (best_product_slider.length) {
        best_product_slider.owlCarousel({
            items: 4,
            loop: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            nav: true,
            navText: ["next", "previous"],
            responsive: {
                0: {
                    margin: 15,
                    items: 1,
                    nav: false
                },
                576: {
                    margin: 15,
                    items: 2,
                    nav: false
                },
                768: {
                    margin: 30,
                    items: 3,
                    nav: true
                },
                991: {
                    margin: 30,
                    items: 4,
                    nav: true
                }
            }
        });
    }

    //product list slider
    var product_list_slider = $('.product_list_slider');
    if (product_list_slider.length) {
        product_list_slider.owlCarousel({
            items: 1,
            loop: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            nav: true,
            navText: ["next", "previous"],
            smartSpeed: 1000,
            responsive: {
                0: {
                    margin: 15,
                    nav: false,
                    items: 1
                },
                600: {
                    margin: 15,
                    items: 1,
                    nav: false
                },
                768: {
                    margin: 30,
                    nav: true,
                    items: 1
                }
            }
        });
    }

    //single banner slider
    // var banner_slider = $('.banner_slider');
    // if (banner_slider.length) {
    //   banner_slider.owlCarousel({
    //     items: 1,
    //     loop: true,
    //     dots: false,
    //     autoplay: true,
    //     autoplayHoverPause: true,
    //     autoplayTimeout: 5000,
    //     nav: true,
    //     navText: ["next","previous"],
    //     smartSpeed: 1000,
    //   });
    // }

    if ($('.img-gal').length > 0) {
        $('.img-gal').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }


    //single banner slider
    $('.banner_slider').on('initialized.owl.carousel changed.owl.carousel', function (e) {
        function pad2(number) {
            return (number < 10 ? '0' : '') + number
        }
        var carousel = e.relatedTarget;
        $('.slider-counter').text(pad2(carousel.current()));

    }).owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        nav: true,
        navText: ["next", "previous"],
        smartSpeed: 1000,
        responsive: {
            0: {
                nav: false
            },
            600: {
                nav: false
            },
            768: {
                nav: true
            }
        }
    });



    // niceSelect js code
    $(document).ready(function () {
        $('select').niceSelect();
    });

    // menu fixed js code
    // $(window).scroll(function () {
    //   var window_top = $(window).scrollTop() + 1;
    //   if (window_top > 50) {
    //     $('.main_menu').addClass('menu_fixed animated fadeInDown');
    //   } else {
    //     $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    //   }
    // });


    $('.counter').counterUp({
        time: 2000
    });

    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        speed: 300,
        infinite: true,
        asNavFor: '.slider-nav-thumbnails',
        autoplay: true,
        pauseOnFocus: true,
        dots: true,
    });

    $('.slider-nav-thumbnails').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider',
        focusOnSelect: true,
        infinite: true,
        prevArrow: false,
        nextArrow: false,
        centerMode: true,
        responsive: [{
            breakpoint: 480,
            settings: {
                centerMode: false,
            }
        }]
    });


    // Search Toggle
    $("#search_input_box").hide();
    $("#search_1").on("click", function () {
        $("#search_input_box").slideToggle();
        $("#search_input").focus();
    });
    $("#close_search").on("click", function () {
        $('#search_input_box').slideUp(500);
    });

    //------- Mailchimp js --------//  
    function mailChimp() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();

    //------- makeTimer js --------//  
    function makeTimer() {

        //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
        var endTime = new Date("27 Sep 2019 12:56:00 GMT+01:00");
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $("#days").html("<span>Days</span>" + days);
        $("#hours").html("<span>Hours</span>" + hours);
        $("#minutes").html("<span>Minutes</span>" + minutes);
        $("#seconds").html("<span>Seconds</span>" + seconds);

    }


    setInterval(function () {
        makeTimer();
    }, 1000);

    // click counter js


    // var a = 0;
    // $('.increase').on('click', function(){



    //   console.log(  $(this).innerHTML='Product Count: '+ a++ );
    // });

    var product_overview = $('#vertical');
    if (product_overview.length) {
        product_overview.lightSlider({
            gallery: true,
            item: 1,
            vertical: true,
            verticalHeight: 450,
            thumbItem: 3,
            slideMargin: 0,
            speed: 600,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        item: 1,

                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        item: 1,
                        slideMove: 1,
                        verticalHeight: 350,
                    }
                }
            ]
        });
    }


    //  MY TURN


    // click counter js

    let my_product_counter = document.getElementsByClassName("my_product_counter");

    try {
        for (let i = 0; i < my_product_counter.length; i++) {
            const element = my_product_counter[i];

            let min = element.children[1].attributes[3].value;
            let max = element.children[1].attributes[4].value;
            let val = element.children[1].attributes[2].value;

            let decr = element.children[0];
            let incr = element.children[2];

            decr.addEventListener("click", (e) => {
                decrement();
            });
            incr.addEventListener("click", (e) => {
                increment();
            });

            function decrement() {
                var value = val;
                value--;
                if (!min || value >= min) {
                    val = value;
                }
                element.children[1].attributes[2].value = val;
            }

            function increment() {
                var value = val;
                value++;
                if (!max || value <= max) {
                    val = value++;
                }
                element.children[1].attributes[2].value = val;
            }
        }
    } catch (err) {
        console.log(":::", err);
    }


    // calculate the total for cart
    function getTotal(total, price, val) {
        for (let i = 0; i < total.length; i++) {
            const t = total[i];
            const p = price[i];
            const v = val[i];

            t.innerHTML = "$" + (Number(p.innerHTML.replace(/[$]|[,]/g, "")) * Number(v.attributes[2].value)).toLocaleString();
        }
        try {
            subTotalUpdate();
        }
        catch (err) {
            console.log(":::", err);
        }
    }

    try {
        for (let i = 0; i < my_product_counter.length; i++) {
            const element = my_product_counter[i];
            const price = document.getElementsByClassName("cart_price");
            const total = document.getElementsByClassName("cart_total");
            const val = document.getElementsByClassName("cart_value");

            let decr = element.children[0];
            let incr = element.children[2];

            incr.addEventListener("click", () => {
                getTotal(total, price, val);
            });

            decr.addEventListener("click", () => {
                getTotal(total, price, val);
            });

        }

    } catch (err) {
        console.log(":::", err);
    }


    function subTotalUpdate() {
        const subT = document.getElementById("subTotal");
        const total = document.getElementsByClassName("cart_total");
        let h = 0;
        for (let i = 0; i < total.length; i++) {
            const ele = total[i];
            h += Number(ele.innerHTML.replace(/[$]|[,]/g, ""));
        }

        subT.innerHTML = "$" + h.toLocaleString();
    }

    try {
        subTotalUpdate();
    } catch (err) {
        console.log(":::::err", err);
    }

    // Replace the 'public' with '' and allows me show img
    const product_img = document.getElementsByClassName("product_img");
    for (let i = 0; i < product_img.length; i++) {
        const img = product_img[i];
        try {
            img.setAttribute("src", img.attributes.src.value.replace("public", ""));
        } catch (err) {
            console.log(":::", err);
            img.setAttribute("src", "\img\product\product_6.png");
        }
    }
}(jQuery));