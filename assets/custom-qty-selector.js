document.addEventListener("DOMContentLoaded", () => {
  const targetNode = document.querySelector(
    ".select-popout__toggle--qty .select-popout__value"
  );
  const config = { childList: true, subtree: true };
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        if (targetNode.getAttribute('data-product-type') === 'Fabric' && !targetNode.innerText.includes('Yards')) {
            targetNode.innerText = targetNode.innerText === '1' ? targetNode.innerText + ' Yard' : targetNode.innerText + ' Yards'
        }
        if ((targetNode.getAttribute('data-product-type') === 'Wallpaper' || targetNode.getAttribute('data-product-type') === 'Grasscloth')  && !targetNode.innerText.includes('Rolls')) {
            targetNode.innerText = targetNode.innerText === '1' ? targetNode.innerText + ' Roll' : targetNode.innerText + ' Rolls'
        }
    }
  }
}

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
});
