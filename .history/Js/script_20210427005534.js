/*
Music Seek Range
----------------------------------------------------------------------------------
*/
musicSldr = new mdc.slider.MDCSlider(document.querySelector('.mdc-slider.music'));
musicSldr.root.addEventListener('MDCSlider:change', (e) => console.log(e.detail.value));


/*
    let value = 10
    sldr.inputs[0].value = value
    sldr.trackActive.style.transform = `scaleX(${value / 100})`
    sldr.thumbs[0].style.transform = `translateX(${value * 3}px)`
*/

/*
  console.log(incrementValue);
      if (!musicStopped) {
        moveMusicSlider(value);
        value = incrementValue + value;
      }

      */
     