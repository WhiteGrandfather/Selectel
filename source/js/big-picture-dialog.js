'use strict';

(function () {
  var POPUP_BIG_PICTURE_CLASS_NUMBER = 1;
  var bigPictureElement = document.querySelector('.big-picture');
  var picturesInlineListElement = document.querySelector('.pictures');
  var bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
  var imageFiltersElement = document.querySelector('.img-filters');
  var imageFiltersFormElement = imageFiltersElement.querySelector('.img-filters__form');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

  var onBigPicturePopupEscPress = function (evt) {
    window.util.getEscEvent(evt, onCloseBigPictureOverlayPopup);
  };

  var onBigPicturePopup = function (evt) {
    if (evt.target.matches('a') || evt.target.matches('img')) {
      window.bigPicture.renderBigPicture(evt.target.classList[POPUP_BIG_PICTURE_CLASS_NUMBER]);
      onOpenBigPictureOverlayPopup();
    }
  };

  var onOpenBigPictureOverlayPopup = function () {
    bigPictureElement.classList.remove('hidden');
    picturesInlineListElement.removeEventListener('click', onBigPicturePopup);
    document.addEventListener('keydown', onBigPicturePopupEscPress);
    bigPictureCloseButton.addEventListener('click', onCloseBigPictureOverlayPopup);
    imageFiltersFormElement.removeEventListener('click', window.minPictures.onFilterActive);
    imageFiltersFormElement.removeEventListener('click', window.minPictures.onFilterChange);
  };

  var onCloseBigPictureOverlayPopup = function () {
    bigPictureElement.classList.add('hidden');
    picturesInlineListElement.addEventListener('click', onBigPicturePopup);
    document.removeEventListener('keydown', onBigPicturePopupEscPress);
    bigPictureCloseButton.removeEventListener('click', onCloseBigPictureOverlayPopup);
    imageFiltersFormElement.addEventListener('click', window.minPictures.onFilterActive);
    imageFiltersFormElement.addEventListener('click', window.minPictures.onFilterChange);
    commentsLoaderElement.removeEventListener('cilck', window.bigPicture.onCommentsLoader);
  };

  picturesInlineListElement.addEventListener('click', onBigPicturePopup);
})();
