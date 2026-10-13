jQuery(document).ready(function ($) {

  // set vars
  setProductPageVars();

  // scroll events
  fixedHeader();

  // sliders
  const homeSlider = $('.home-slider');
  const gallerySlider = $('.gallery-slider');
  const homeInnerSlider = $('.home-inner-slider');

  homeSlider.find('img')
  .add(homeInnerSlider.find('img'))
  .add(gallerySlider.find('img'))
  .add('.slider-placeholder img')
  .each(function () {
    var img = $(this);

    function checkOrientation(image) {
      if (image.naturalHeight > image.naturalWidth) {
        img.addClass('is-vertical').removeClass('is-horizontal');
      } else {
        img.addClass('is-horizontal').removeClass('is-vertical');
      }
    }

    if (this.complete) {
      checkOrientation(this);
      img.on('load', function () {
        checkOrientation(this);
      });
    }
  });

  const slickParamsGallery = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<span class="slick-prev"></span>',
    nextArrow: '<span class="slick-next"></span>',
    dots: true,
    dotsClass: 'slick-dots slider-thumbnails',
    customPaging: function (slider, i) {
      var thumb = $(slider.$slides[i]).data('thumb');
      return '<img src="' + thumb + '" alt="thumbnail" />';
    }
  };

  if (homeSlider.length) {
    homeSlider.on('init', function(event, slick){
      $(this).removeClass('slider-loading');
      checkSlideBg(slick, 0);
    });
    homeSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      checkSlideBg(slick, nextSlide);
    });
    homeSlider.slick(slickParamsGallery);
  }

  if (gallerySlider.length) {
    gallerySlider.on('init', function(event, slick){
      $(this).removeClass('slider-loading');
      checkSlideBg(slick, 0);
    });
    gallerySlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      checkSlideBg(slick, nextSlide);
    });
    gallerySlider.slick(slickParamsGallery);
  }

  if (homeInnerSlider.length && isMobileView()) {
    homeInnerSlider.slick(slickParamsGallery);
  }

  const slickParamsAuthors = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<span class="slick-prev"></span>',
    nextArrow: '<span class="slick-next"></span>',
    dots: false,
    variableWidth: true
  };

  const authorsSlider = $('.authors-slider');

  if (authorsSlider.length) {
    authorsSlider.slick(slickParamsAuthors);
  }

  manageMobileSliders();

  // cookies
  /*
  let cookiesPopup = Cookies.get('ahw_cookies_agree');
  if (!cookiesPopup) $(".cookies-popup").removeClass('hidden');

  $('.cookies-popup__close').on('click', function() {
    $('.cookies-popup').addClass('hidden');
    setPopupCloseCookie();
  });
  */

  // mobile menu
  $('[data-menu-open]').on('click', function (e) {
    e.preventDefault();
    $('[data-menu="' + $(this).data('menu-open') + '"]').addClass('is-open');
    $('body').addClass('body-fixed');
  });

  $('[data-menu-close]').on('click', function () {
    $('[data-menu]').removeClass('is-open');
    $('body').removeClass('body-fixed');
  });

  // drawer
  $('[data-drawer-open]').on('click', function (e) {
    e.preventDefault();
    $('[data-drawer="' + $(this).data('drawer-open') + '"]').addClass('is-active');
    $('.vol-drawer-overlay').addClass('is-active');
    $('body').addClass('body-fixed');
  });

  $('[data-drawer-close]').on('click', function () {
    $('[data-drawer]').removeClass('is-active');
    $('.vol-drawer-overlay').removeClass('is-active');
    $('body').removeClass('body-fixed');
  });

  // popups
  $('[data-popup-open]').on('click', function (e) {
    e.preventDefault();
    $('[data-popup="' + $(this).data('popup-open') + '"]').toggleClass('is-open');
  });

  $('[data-popup-close]').on('click', function () {
    $('[data-popup="' + $(this).data('popup-close') + '"]').removeClass('is-open');
  });

  // catalog filters (TEMP)
  $('.catalog-list__filters__prodtype li').on('click', function (e) {
    $(this).toggleClass('active');
  });
  $('.catalog-list__filters').on('submit', function (e) {
    e.preventDefault();
  });

  // submit request (TEMP)
  $('.product-request__form').on('submit', function (e) {
    e.preventDefault();
    $('.product-request__desc p, .product-request__form__field, .product-request__form__submit').addClass('hidden');
    $('.product-request__form__consent').addClass('invisible');
    $('.product-request__form__success').removeClass('hidden');
  });

  // masked input
  $('#req_phone').mask('+7 (999) 999-9999');

  /**
  * General events
  */

  // on scroll
  window.onscroll = function() {
    // fix header
    fixedHeader();
  };

  // on resize
  window.addEventListener('resize', function(event) {
    setProductPageVars();
    fixedHeader();
  }, true);

  let resizeTimeout;
  $(window).on('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(manageMobileSliders, 100);
  });

  /**
   * Functions
   */

  function setProductPageVars() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    if (document.getElementById('add2cartblock')) {
      let add2cartblock = document.getElementById('add2cartblock').offsetHeight;
      document.documentElement.style.setProperty('--add2cartblock', `${add2cartblock}px`);
    }
  }

  function isMobileView() {
    return window.innerWidth <= 767;
  }

  function isTabletView() {
    return window.innerWidth <= 1099;
  }

  function fixedHeader() {
    let startPoint = 0;
    if ($('#wpadminbar').length) {
      startPoint += $('#wpadminbar').outerHeight();
    }
    
    if (window.scrollY > startPoint) {
      window.document.body.classList.add('header-fixed');
    } else {
      window.document.body.classList.remove('header-fixed');
    }
  }

  function setPopupCloseCookie() {
    Cookies.set( 'ahw_cookies_agree', '1', { path: '/', expires: 365 } );
  }

  function checkSlideBg(slick, slideIndex) {
      var slideElement = $(slick.$slides[slideIndex]);
      if (slideElement.hasClass('bg-dark')) {
        $('body').addClass('dark-bg');
      } else {
        $('body').removeClass('dark-bg');
      }
    }

  function manageMobileSliders() {
    // home inner slider
    if (homeInnerSlider.length) {
      if (isMobileView()) {
        if (!homeInnerSlider.hasClass('slick-initialized')) {
          homeInnerSlider.slick(slickParamsGallery);
        }
      } else {
        if (homeInnerSlider.hasClass('slick-initialized')) {
          homeInnerSlider.slick('unslick');
        }
      }
    }

    // brands slider
    const slickParamsBrands = {
      slidesToShow: 3,
      slidesToScroll: 2,
      arrows: false,
      dots: false,
      centerMode: true,
      variableWidth: true
    };

    const brandsSlider = $('.brands-slider');

    if (brandsSlider.length) {
      if (isTabletView()) {
        if (!brandsSlider.hasClass('slick-initialized')) {
          brandsSlider.slick(slickParamsBrands);
        }
      } else {
        if (brandsSlider.hasClass('slick-initialized')) {
          brandsSlider.slick('unslick');
        }
      }
    }

    // featured products slider
    const featuredSlider = $('.featured-slider');

    if (featuredSlider.length) {
        if (featuredSlider.hasClass('slick-initialized')) {
            featuredSlider.slick('unslick');
        }

        if (isMobileView()) {
          featuredSlider.find('.slick-cloned').remove();

          featuredSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              fade: false,
              arrows: false,
              dots: false,
              respondTo: 'slider'
          });
        }
    }

    // news slider
    const newsSlider = $('.news-slider');

    if (newsSlider.length) {
        if (newsSlider.hasClass('slick-initialized')) {
            newsSlider.slick('unslick');
        }

        if (isMobileView()) {
          newsSlider.find('.slick-cloned').remove();

          newsSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              fade: false,
              arrows: false,
              dots: false,
              respondTo: 'slider'
          });
        }
    }
  }

});
