/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Ao carregar a página
    --------------------*/
    $(window).on('load', function () {
        initPreloader();
        initPortfolioFilter();
        initPortfolioGallery();
        initPagination();
    });

    /*------------------
        Preloader
    --------------------*/
    function initPreloader() {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    }

    /*------------------
        Portfolio filter
    --------------------*/
    function initPortfolioFilter() {
        $('.portfolio__filter li').on('click', function () {
            //$('.portfolio__filter li').removeClass('active');
            //$(this).addClass('active');
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
    
            let filter = $(this).data('filter');
    
            // Aplica o filtro no MixItUp
            let mixer = mixitup('.portfolio__gallery', {
                load: {
                    filter: filter // Aplica o filtro selecionado
                }
            });
    
            // Aguarda a filtragem ser aplicada antes de atualizar a paginação
            mixer.filter(filter).then(() => {
                console.log(filter);
                
            });
        });
    }

    /*------------------
        Portfolio galery
    --------------------*/
    function initPortfolioGallery() {
        if ($('.portfolio__gallery').length > 0) {
            let containerEl = document.querySelector('.portfolio__gallery');
            mixitup(containerEl);
        }
    }

    /*------------------
        Pagination Logic
    --------------------*/
    function initPagination() {
        let itemsPerPage = 6;
        let currentPage = 1;
        let items = $(".portfolio__item");
        let totalPages = Math.ceil(items.length / itemsPerPage);

        function showPage(page) {
            items.hide();
            let start = (page - 1) * itemsPerPage;
            let end = start + itemsPerPage;
            items.slice(start, end).fadeIn();

            $(".pagination__option .number__pagination").removeClass("active-page");
            $(".pagination__option .number__pagination").addClass("inactive-page");
            $(".pagination__option .number__pagination").eq(page - 1).addClass("inactive-page");
            $(".pagination__option .number__pagination").eq(page - 1).addClass("active-page");

            $(".left__arrow").toggleClass("disabled", page === 1);
            $(".right__arrow").toggleClass("disabled", page === totalPages);

            window.scrollTo({
                top: $(".breadcrumb__text").offset().top,
                behavior: "smooth"
            });
        }

        function createPagination() {
            let pagination = $(".pagination__option");
            pagination.empty();

            pagination.append('<a href="#" class="arrow__pagination left__arrow"><span class="arrow_left"></span> Prev</a>');

            for (let i = 1; i <= totalPages; i++) {
                pagination.append(`<a href="#" class="number__pagination">${i}</a>`);
            }

            pagination.append('<a href="#" class="arrow__pagination right__arrow">Next <span class="arrow_right"></span></a>');

            $(".number__pagination").click(function (e) {
                e.preventDefault();
                currentPage = parseInt($(this).text());
                showPage(currentPage);
            });

            $(".left__arrow").click(function (e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                }
            });

            $(".right__arrow").click(function (e) {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                }
            });

            showPage(currentPage);
        }

        createPagination();
    }

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
    $(".latest__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Image Popup with Slider
    --------------------*/
    $('.image-popup1').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true, // Ativa o modo de galeria
            navigateByImgClick: true,
            preload: [0, 2] // Pré-carrega as imagens próximas
        },
        mainClass: 'mfp-fade',
        removalDelay: 300,
        closeOnContentClick: true,
        closeBtnInside: false,
        zoom: {
            enabled: true,
            duration: 300
        },
        callbacks: {
            open: function () {
                // Ação ao abrir o popup
                //console.log('Popup aberto');
            },
            close: function () {
                // Ação ao fechar o popup
                //console.log('Popup fechado');
            }
        }
    });

    $('.image-popup2').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true, // Ativa o modo de galeria
            navigateByImgClick: true,
            preload: [0, 2] // Pré-carrega as imagens próximas
        },
        mainClass: 'mfp-fade',
        removalDelay: 300,
        closeOnContentClick: true,
        closeBtnInside: false,
        zoom: {
            enabled: true,
            duration: 300
        },
        callbacks: {
            open: function () {
                // Ação ao abrir o popup
                //console.log(this);
            },
            close: function () {
                // Ação ao fechar o popup
                //console.log('Popup fechado');
            }
        }
    });

    $('.image-popup3').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true, // Ativa o modo de galeria
            navigateByImgClick: true,
            preload: [0, 2] // Pré-carrega as imagens próximas
        },
        mainClass: 'mfp-fade',
        removalDelay: 300,
        closeOnContentClick: true,
        closeBtnInside: false,
        zoom: {
            enabled: true,
            duration: 300
        },
        callbacks: {
            open: function () {
                // Ação ao abrir o popup
                //console.log(this);
            },
            close: function () {
                // Ação ao fechar o popup
                //console.log('Popup fechado');
            }
        }
    });

    $('.image-popup4').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true, // Ativa o modo de galeria
            navigateByImgClick: true,
            preload: [0, 2] // Pré-carrega as imagens próximas
        },
        mainClass: 'mfp-fade',
        removalDelay: 300,
        closeOnContentClick: true,
        closeBtnInside: false,
        zoom: {
            enabled: true,
            duration: 300
        },
        callbacks: {
            open: function () {
                // Ação ao abrir o popup
                //console.log(this);
            },
            close: function () {
                // Ação ao fechar o popup
                //console.log('Popup fechado');
            }
        }
    });

    $('.image-popup5').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true, // Ativa o modo de galeria
            navigateByImgClick: true,
            preload: [0, 2] // Pré-carrega as imagens próximas
        },
        mainClass: 'mfp-fade',
        removalDelay: 300,
        closeOnContentClick: true,
        closeBtnInside: false,
        zoom: {
            enabled: true,
            duration: 300
        },
        callbacks: {
            open: function () {
                // Ação ao abrir o popup
                //console.log(this);
            },
            close: function () {
                // Ação ao fechar o popup
                //console.log('Popup fechado');
            }
        }
    });

    $('.image-popup6').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true, // Ativa o modo de galeria
            navigateByImgClick: true,
            preload: [0, 2] // Pré-carrega as imagens próximas
        },
        mainClass: 'mfp-fade',
        removalDelay: 300,
        closeOnContentClick: true,
        closeBtnInside: false,
        zoom: {
            enabled: true,
            duration: 300
        },
        callbacks: {
            open: function () {
                // Ação ao abrir o popup
                //console.log(this);
            },
            close: function () {
                // Ação ao fechar o popup
                //console.log('Popup fechado');
            }
        }
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);