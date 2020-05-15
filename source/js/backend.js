'use strict';

(function () {
  var URL = 'https://api.jsonbin.io/b/5df3c10a2c714135cda0bf0f/1';
  var CONFIG_CONTAINER = '/';
  var STATUS_CODE_OK = 200;
  var RESPONSE_TYPE_JSON = 'json';
  var XHR_TIMEOUT = 10000;
  var METHOD_GET = 'GET';

  var renderError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; fontSize: 30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var request = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE_JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    request(METHOD_GET, URL + CONFIG_CONTAINER, onSuccess, onError);
  };

  window.backend = {
    load: load,
    renderError: renderError
  };
})();
