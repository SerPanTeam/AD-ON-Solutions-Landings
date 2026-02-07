/*----------theme js-----------------*/

/*====================================
01. Mobile Menu js
02. header sticky js
03. odometer js
04. magnificPopup Js
05. hero slider js
06. testi active js
07. wedding active js
=====================================*/

(function ($) {
  "use strict";

  // Mobile Menu js
  $(".mobile-menu nav").meanmenu({
    meanScreenWidth: "991",
    meanMenuContainer: ".mobile-menu",
    meanMenuOpen: "<span></span> <span></span> <span></span>",
    onePage: false,
  });

  // header sticky js
  var wind = $(window);
  var sticky = $("#sticky-header");
  wind.on("scroll", function () {
    var scroll = wind.scrollTop();
    if (scroll < 100) {
      sticky.removeClass("sticky");
    } else {
      sticky.addClass("sticky");
    }
  });

  ///////////////////////////////
  //odometer js

  $(document).ready(function () {
    $(".odometer-wrapper").appear(function () {
      let count = $(this).attr("data-count");
      let odometer = $(this).closest(".odometer-wrapper").find(".odometer");

      setTimeout(function () {
        odometer.html(count);
      }, 500);
    });
  });

  //magnificPopup Js
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  // hero slider all js
  const sliderswiper = new Swiper(".lavewell-slider-active", {
    // Optional parameters
    speed: 2500,
    loop: true,
    slidesPerView: 1,
    autoplay: true,
    effect: "fade",
    breakpoints: {
      1600: {
        slidesPerView: 1,
      },
      1400: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },

      a11y: false,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev",
    },

    pagination: {
      el: ".lavewell-slider-dots",
      clickable: true,
    },
  });

  // home-1 testi active js
  var slider = new Swiper(".testi-active", {
    speed:2500,
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1400: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".testi-next",
      prevEl: ".testi-prev",
    },
  });

  // home-1 wedding active js
  var slider = new Swiper(".wedding-active", {
    speed: 2500,
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1400: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".wedding-next",
      prevEl: ".wedding-prev",
    },
  });
})(jQuery);
