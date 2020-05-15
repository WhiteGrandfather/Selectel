(function () {
  // try {
    var sliderPointElement = document.querySelector('.slider__point');

    sliderPointElement.addEventListener('mousedown', window.slider.onDialogMousedownDrag);

  // } catch (err) {
  //   console.log('ошибка ' + err);
  // };
})()
