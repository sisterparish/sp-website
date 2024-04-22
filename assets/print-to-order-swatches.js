window.addEventListener("DOMContentLoaded", () => {
    let printToOrderSwatches = document.querySelectorAll('.swatch__button--print-to-order');
    let stockedSwatches = document.querySelectorAll('.swatch__button--stocked');
    let printToOrderModal = document.querySelector('.print-to-order-modal');
    let printToOrderModalProduct = document.querySelector('#ContactFormSKU');
    let addToCartBttn = document.querySelector('button[name="add"].product__submit__add');
    let printToOrderBttn = document.querySelector('#print-to-order-button');
    let productTitle = document.querySelector('.product__title').textContent;
    let checkedinput = document.querySelector('.swatch__input[checked]');
    let productImgArr = document.querySelectorAll('.product-single__media-slide');
    let stockLink = document.querySelector('.stock-pdp');
    let stockNumber = document.querySelector('.variant__countdown--in');
    let lowStockNumber = document.querySelector('.variant__countdown--low')
    let productUnit = stockNumber.getAttribute('data-unit');

    // functional js to call for print to order modal
    let removeSpaceAndHyphen = (string) => {
        return string.replace(/[\s-]/g, '').toLowerCase();
    }

    let openModal = (modal) => {
        if (modal.classList.contains('open')) {
            return
        } else {
            modal.classList.add('open');
        }
    }

    let closeModal = (modal) => {
        if (modal.classList.contains('open')) {
            modal.classList.remove('open')
        } else {
            return
        }
    }

    let hideButton = (el) => {
        if (el) {
            if (el.classList.contains('hide')) {
                return
            } else {
                el.classList.add('hide');
            }
        } else {
            return
        }
    }

    let showButton = (el) => {
        if (el.classList.contains('hide')) {
           el.classList.remove('hide')
        } else {
            return
        }
    }

    let updateProductImage = (label) => {
        let labelColor = label.getAttribute('data-swatch');
            labelColor = removeSpaceAndHyphen(labelColor);

        var flkty = themeVendor.Flickity.data('.product-single__media-slider.flickity-enabled');
          
        productImgArr.forEach(function(image) {
            let imageColor = image.getAttribute('data-color');
                imageColor = removeSpaceAndHyphen(imageColor);

            if (imageColor) {
                if (imageColor === labelColor && flkty) {
                    var index = jQuery(image).index();
                    flkty.select(index,false,true)
                }else{
                    if(!flkty){
                        if (imageColor === labelColor) {
                            image.style.display = "flex"
                        } else {
                            image.style.display = "none"
                        }
                    }
                }
            }
        })
    }

    let updateProductForm = (label) => {
        let vTitle = label.getAttribute('data-swatch-variant-title');
        let vSKU = label.getAttribute('data-swatch-variant-sku');
        let newValue = productTitle + " - " + vTitle + " (SKU: " + vSKU + ")"

        printToOrderModalProduct.value = newValue;

      if (label.getAttribute('data-swatch-variant-inventory-qty') === '0'){
        const addToCart = document.querySelector('.product__submit__add');
         addToCart.querySelector('[data-add-to-cart-text]').innerText = 'Add Bespoke to Order';
      }
    }

    let updateStockLink = (label) => {
        let vSKU = label.getAttribute('data-swatch-variant-sku');
        let rawStockLinkURL = stockLink.getAttribute('href');

        let urlParts = rawStockLinkURL.split('?');
        if (urlParts.length === 2) {
            let baseURL = urlParts[0];
            let queryParams = urlParts[1].split('&');

            for (var i = 0; i < queryParams.length; i++) {
                let paramParts = queryParams[i].split('=');
                if (paramParts[0] === 'sku') {
                    paramParts[1] = vSKU;
                    queryParams[i] = paramParts.join('=');
                }
            }

            let updatedURL = baseURL + "?" + queryParams.join('&');
            stockLink.setAttribute("href", updatedURL);
        } 
    }

    let updateStockNumber = (label) => {
        let vQTY = label.getAttribute("data-swatch-variant-inventory-qty");
        let vQTYNum = parseInt(vQTY);
        if (vQTYNum <= 0) {
            stockNumber.style.display = 'none';
            lowStockNumber.style.display = 'block'
            return
        } else {
            stockNumber.style.display = 'block';
            lowStockNumber.style.display = 'none'
            if (productUnit == "yards") {
                if (vQTY == "1") {
                    let updatedString = vQTY + " yard in stock"
                    stockNumber.innerText = updatedString;
                } else {
                    let updatedString = vQTY + " yards in stock"
                    stockNumber.innerText = updatedString;
                }
            } else if (productUnit == "rolls") {
                if (vQTY == "1") {
                    let updatedString = vQTY + " roll in stock"
                    stockNumber.innerText = updatedString;
                } else {
                    let updatedString = vQTY + " rolls in stock"
                    stockNumber.innerText = updatedString;
                }             
            } else if (productUnit == "none") {
                let updatedString = vQTY + "in stock"
                stockNumber.innerText = updatedString;
            }
        }
    }

    // stocked swatches click event listener
    for (var i = 0; i < stockedSwatches.length; i++){
        stockedSwatches[i].addEventListener('click', (event) => {
            hideButton(printToOrderBttn);
            showButton(addToCartBttn);
            if ( event.target.nodeName == 'LABEL' ) {
                let label = event.target;
                updateProductImage(label);
                updateStockLink(label);
                updateStockNumber(label);
            }
        })
    }

    // P2O swatches click event listener
    for (var i = 0; i < printToOrderSwatches.length; i++){
        printToOrderSwatches[i].addEventListener('click', (event) => {
            showButton(printToOrderBttn);
            hideButton(addToCartBttn);
            if ( event.target.nodeName == 'LABEL' ) {
                let label = event.target;
                updateProductForm(label);
                updateProductImage(label);
                updateStockLink(label);
                updateStockNumber(label);
            }
        })
    }

    // P2O button click event listener
    if (printToOrderBttn) {
        printToOrderBttn.addEventListener('click', () => {
            openModal(printToOrderModal);
        })
    }
    
    window.addEventListener('click', event => {
        if (event.target == printToOrderModal) {
          closeModal(printToOrderModal);
        }
    });

    // check for initial input check on dom load to update form product data
    if ( checkedinput != undefined ) {
        label = checkedinput.nextElementSibling;
        updateProductForm(label);
    }
})
