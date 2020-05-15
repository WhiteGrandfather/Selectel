'use strict';

(function () {
  var MIN_PIN_POSITION = 0;
  var sliderElement = document.querySelector('.slider');
  var sliderColorLineElement = sliderElement.querySelector('.slider__line');
  var effectLevelPinElement = sliderElement.querySelector('.slider__point');
  // var imageUploadFormElement = document.querySelector('.img-upload__form');
  // var imgUploadPreviewElement = imageUploadFormElement.querySelector('.img-upload__preview');
  // var effectLevelLine = imageUploadFormElement.querySelector('.effect-level__line');
  // var imgUploadPreviewElementContainer = imageUploadFormElement.querySelector('.img-upload__preview-container');
  // var effectLevelPinElement = effectLevelLine.querySelector('.effect-level__pin');
  // var effectLevelDepthElement = effectLevelLine.querySelector('.effect-level__depth');
  // var previewImageElement = imgUploadPreviewElement.querySelector('img');


  // var getCurrentEffect = function (index) {
  //   if (imgUploadPreviewElementContainer.querySelector('.effects__preview--chrome')) {
  //     return 'grayscale(' + index + ')';
  //   }
  //   if (imgUploadPreviewElementContainer.querySelector('.effects__preview--sepia')) {
  //     return 'sepia(' + index + ')';
  //   }
  //   if (imgUploadPreviewElementContainer.querySelector('.effects__preview--marvin')) {
  //     return 'invert(' + (index * 100) + '%)';
  //   }
  //   if (imgUploadPreviewElementContainer.querySelector('.effects__preview--phobos')) {
  //     return 'blur(' + (index * 3) + 'px)';
  //   }
  //   if (imgUploadPreviewElementContainer.querySelector('.effects__preview--heat')) {
  //     return 'brightness(' + (index * 3) + ')';
  //   }
  //   return 'unset';
  // };

  var onDialogMousedownDrag = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    console.log("pin-click")

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var pinElementPosition = (effectLevelPinElement.offsetLeft - shift.x);
      var lineElementWidth = sliderElement.getBoundingClientRect().width;

      var PinPercentPosition = Math.floor(window.util.getMinMaxValue(pinElementPosition, lineElementWidth, MIN_PIN_POSITION) / (lineElementWidth / 100)) / 100;

      console.log(lineElementWidth)
      console.log("pin-move");
      console.log('pin-position ' + PinPercentPosition);

      // previewImageElement.style.filter = getCurrentEffect(PinPercentPosition);
       effectLevelPinElement.style.left = window.util.getMinMaxValue(pinElementPosition, lineElementWidth, MIN_PIN_POSITION) + 'px';
       sliderColorLineElement.style.width = window.util.getMinMaxValue(pinElementPosition, lineElementWidth, MIN_PIN_POSITION) + 'px';
      // effectLevelDepthElement.style.width = window.util.getMinMaxValue(pinElementPosition, lineElementWidth, MIN_PIN_POSITION) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.slider = {
    onDialogMousedownDrag: onDialogMousedownDrag
  };
})();
