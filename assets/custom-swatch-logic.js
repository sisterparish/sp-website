(function($) {
  'use strict';

  $(function() {

    const options = $(".radio__button[data-ground-option]")
      
    function loopOptions(thisGround, swatchClickEl)  {
      const variantId = $(swatchClickEl).data('swatch-variant')
      $(options).each(function(){

        if($(this).data('ground-option') == thisGround){
          // Hide all other ground options that aren't the correct match.
          // Then select the ground that matches to update the ATC form.
          $(this).removeClass('hide')
          $(this).find('label.radio__label').click()
          setTimeout(() => {
              // uses variant ID to identify correct swatch, as Theme.js may re-render or alter swatches 
              $(`.swatch__button .swatch__label[data-swatch-variant='${variantId}']`).click()
          }, 200);
        }else{
            $(this).addClass('hide')
        }
      })
    }

    $(".swatch__button label.swatch__label").on("click", function(event){

      event.preventDefault(); // Debugs the page scrolling built-in function that was causing PDP to scroll to odd places when swatches were clicked 
      const swatchClickElParent = $(this).closest(".swatch__button")
      const swatchClickEl = $(this)

      const selectedSwatchValue = swatchClickEl.data('swatch');      
      updateProductTitleWithSwatchValue(selectedSwatchValue);

      // Ensures the check on the selected swatch 
      // will always be visible on selected swatch
      // (last swatch was buggy either natively or post-print-to-order swatch build) 
      $('.icon-check').each(function(){
        if($(this).closest(".swatch__label").data('swatch-variant') != $(swatchClickEl).data('swatch-variant')){
          if($(this).css('visibility') == 'visible'){
            $(this).css('visibility', 'hidden')
            $(this).css('opacity', '0')
          }
        }else{
          if($(this).css('visibility').includes('hidden')){
            $(this).css({'visibility': 'visible', 'opacity': '1'})
          }
        }
      })
      // Adds a class to check if swatch has been force-clicked yet. 
      // Force click is necessary to switch grounds 
      if(!$(swatchClickElParent).hasClass('custom-click')){
        $(swatchClickElParent).addClass('custom-click')
        const thisGround = $(swatchClickElParent).data('ground-avail')
        if($(options) && $(options).length > 0){
          loopOptions(thisGround, swatchClickEl)          
        }
      }else{
        setTimeout(() => {
          $(".swatch__button").each(function(){
            $(this).removeClass('custom-click')
          })
        }, 500);
      }
    })
    
    const pageLoadSelectedSwatches = $(".swatch__button input.swatch__input[checked]")

    const selectedSwatchValue = pageLoadSelectedSwatches.siblings('label.swatch__label').data('swatch');
    updateProductTitleWithSwatchValue(selectedSwatchValue)
    
    $(pageLoadSelectedSwatches).each(function(){
      // Forces the last swatch to show a visible check, even if it is marked sold out / workaround for bug 
      const check = $(this).siblings('label.swatch__label').find('.icon-check')
      if($(check) && $(check).length){
        if($(check).css('visibility').includes('hidden')){
          $(check).css({'visibility': 'visible', 'opacity': '1'})
        }
      }
      if(!$(this).closest(".swatch__button").hasClass('hide')){
        // Sometimes, in the case of print to order options, the page loads with two selected swatches (one is hidden from view)
        const pageLoadSelectedSwatch = $(this)
        const pageLoadSelectedSwatchParent = $(pageLoadSelectedSwatch).closest(".swatch__button")
        const pageLoadGround = $(pageLoadSelectedSwatchParent).data('ground-avail')
        loopOptions(pageLoadGround, $(pageLoadSelectedSwatch).siblings('label.swatch__label'))
      }
    })

    function updateProductTitleWithSwatchValue(selectedSwatchValue) {
      const productTitleElement = $(".product__title");
      productTitleElement.find(".swatch-value").remove(); 
      productTitleElement.append(`<span class="swatch-value"> ${selectedSwatchValue}</span>`);
    }
    
});
})(jQuery);