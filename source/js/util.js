'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ESC_KEY = 'Escape';
  var lastTimeout;

  var getMinMaxValue = function (value, maxValue, minValue) {
    if (value >= maxValue) {
      return maxValue;
    }
    return (value <= minValue) ? minValue : value;
  };

  var calcRandom = function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getEscEvent = function (escEvt, action) {
    if (escEvt.key === ESC_KEY) {
      action();
    }
  };

  var sortRandom = function (arr) {
    var j;
    var temp;

    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      callback();
    }, DEBOUNCE_INTERVAL);
  };

  var renderPrice = function (price) {
    price += "";
    price = new Array(4 - price.length % 3).join("U") + price;
    return price.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
  }

  window.util = {
    renderPrice: renderPrice,
    getMinMaxValue: getMinMaxValue,
    calcRandom: calcRandom,
    getEscEvent: getEscEvent,
    sortRandom: sortRandom,
    debounce: debounce
  };
}
)();
