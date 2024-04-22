(function($) {
  'use strict';

  $(function() {
$(document).ready(function() {
  if ( $('.scheme-suggestion-wrapper').length ) {
    setTimeout(() => {
      let varId = parseInt(window.location.href.split('variant=').pop())
      let firstIteration = true;
      $('.scheme-suggestion-container').each(function() {
        $(this).parent().hide()
        if ( varId === $(this).data('variant-id') ) {
          // console.log($(this))
          $(this).parent().show()
          $(this).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            responsive: [
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2
                }
              }
            ]
          })
        } else if (firstIteration) {
          $(this).parent().show()
          $(this).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            responsive: [
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2
                }
              }
            ]
          })
          firstIteration = false;
        }
      })

    $('.swatch__button :radio').change(function() {
      setTimeout(() => {
       varId = parseInt(window.location.href.split('variant=').pop())
  
        $('.scheme-suggestion-container').each(function() {
          if ( $(this).hasClass('slick-initialized') ) {
            $(this).slick('unslick')
          }
          $(this).parent().hide()
          if ( varId === $(this).data('variant-id') ) {
            $(this).parent().show()
            $(this).slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              responsive: [
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 2
                  }
                }
              ]
            })
          }
        })
      }, "200")
    })
    }, "200")
  
  }
})

});
})(jQuery);