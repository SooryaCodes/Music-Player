sldr = new mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
sldr.root.addEventListener('MDCSlider:change', (e)=>console.log(e));    