(function () {
  var CORES = 8;
  var GPU = false;
  var RAID = false;
  var SSD = false;
  var formListElement = document.querySelector('.form__list')
  var FormItemTamplateElement = document.querySelector('#form-item')
  var FormItemTamplateElement = document.querySelector('#form-item')
  var FormItemElement = FormItemTamplateElement.content.querySelector('li');
  var configList = [{"name":"G1","disk":{"type":"SSD","value":480,"count":4},"cpu":{"name":"Intel Xeon E5-2630 2.2ГГц","cores":4,"count":2},"ram":"64 ГБ RAM","price":5200000,"gpu":"4 × GTX 1080"},{"name":"D4","disk":{"type":"HDD","value":500,"count":1},"cpu":{"name":"Intel Core i3 2120 3.3ГГц","cores":2,"count":1},"ram":"8 ГБ RAM","price":370000},{"name":"D8","disk":{"type":"SSD","value":460,"count":1},"cpu":{"name":"Intel Xeon E-2236 3.4ГГц","cores":3,"count":2},"ram":"32 ГБ RAM","price":1600000},{"name":"С11","disk":{"type":"HDD","value":500,"count":4},"cpu":{"name":"Xeon E5-1650 3.6ГГц","cores":4,"count":2},"ram":"32 ГБ RAM","price":3200000},{"name":"P9","disk":{"type":"SSD","value":480,"count":2},"cpu":{"name":"Intel Xeon E3-1230 3.4ГГц","cores":4,"count":1},"ram":"16 ГБ RAM","price":1600000},{"name":"T800","disk":{"type":"SSD","value":960,"count":4},"cpu":{"name":"Skynet T8-4200 4.8ГГц","cores":3,"count":4},"ram":"256 ГБ RAM","price":9999900,"gpu":"8 × Skynet Video 800"},{"name":"G7","disk":{"type":"SSD","value":960,"count":2},"cpu":{"name":"Intel Xeon E5-2660 2.7ГГц","cores":6,"count":2},"ram":"128 ГБ RAM","price":8900000,"gpu":"2 × Tesla T4"},{"name":"D3","disk":{"type":"SSD","value":240,"count":1},"cpu":{"name":"Intel Xeon E3-3420 2.5ГГц","cores":3,"count":2},"ram":"32 ГБ RAM","price":3950000},{"name":"P9","disk":{"type":"SSD","value":480,"count":2},"cpu":{"name":"Intel Xeon E3-1230 3.4ГГц","cores":2,"count":2},"ram":"32 ГБ RAM","price":720000},{"name":"C8","disk":{"type":"HDD","value":960,"count":8},"cpu":{"name":"Intel Xeon E2-5500 4.4ГГц","cores":4,"count":2},"ram":"64 ГБ RAM","price":2700000},{"name":"T9","disk":{"type":"SSD","value":960,"count":1},"cpu":{"name":"Intel Xeon E4-5200 3.4ГГц","cores":4,"count":2},"ram":"64 ГБ RAM","price":4800000},{"name":"B182","disk":{"type":"HDD","value":240,"count":4},"cpu":{"name":"Intel Xeon E4-5200 3.ГГц","cores":2,"count":2},"ram":"128 ГБ RAM","price":1200000}];


  var getFilteredConfig = function(cores, video, raid) {
    var suitableList = configList.filter(function (item) {
      return item.cpu.cores * item.cpu.count === cores;
    });

    if(video) {
      suitableList = suitableList.filter(function (item) {
        return item.gpu;
      });
    }

    if(raid) {
      suitableList = suitableList.filter(function (item) {
        return item.disk.count >= 2;
      });
    }

    if(ssd) {
      suitableList = suitableList.filter(function (item) {
        return item.disk.type === 'SSD';
      });
    }

    console.log(suitableList);
      return suitableList;
  };

  var renderError = function () {
      var node = document.createElement('li');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; fontSize: 30px';

      node.textContent = 'Нет результатов';
      formListElement.insertAdjacentElement('beforeend', node);
  };

  // var getConfigList = function () {
  //   var configListCopy = configList.slice();
  // }

  // getConfigList();

  // var getConfigList = function (config) {
  //   Временно отключил запросы на сервер

  //   config.forEach(function (item) {
  //     configList.push(item);
  //   });

  //   renderFormList(getConfig(CORES, false));
  // };

  // window.backend.load(getConfigList, window.backend.renderError);

  var renerTextCount = function (count) {
    if(count >= 2) {
      return count + ' x ';
    } else {
      return '';
    }
  };

  var renderMultipleCoresText = function (count, cores) {
    var coresNumber = count * cores;
    if(coresNumber >= 5) {
      return coresNumber + ' ядер';
    } else {
      return coresNumber + ' ядра';
    }
  }

  var renderFormItem = function (index) {
    var element = FormItemElement.cloneNode(true);

    element.querySelector('.form__group-title').textContent = index.name;
    element.querySelector('.form__item-text--processor').textContent = renerTextCount(index.cpu.count) + index.cpu.name + ', ' + renderMultipleCoresText(index.cpu.count, index.cpu.cores);
    element.querySelector('.form__item-text--ram').textContent = index.ram;
    element.querySelector('.form__item-text--drive').textContent =  renerTextCount(index.disk.count) + index.disk.value + ' ГБ ' + index.disk.type;
    element.querySelector('.form__item-price').textContent = window.util.renderPrice(index.price);

    if(index.gpu) {
      element.querySelector('.form__item-text--gpu').style.display = 'block';
      element.querySelector('.form__item-text--gpu').textContent = index.gpu
    }

    return element
  };

  var renderFormList = function (itemsList) {
    if(itemsList.length > 0) {
      var fragment = document.createDocumentFragment();

      itemsList.forEach(function (item) {
        fragment.appendChild(renderFormItem(item));
      });

      formListElement.appendChild(fragment);
    } else {
      renderError();
    }
  }

  renderFormList(getFilteredConfig(CORES, GPU, RAID, SSD));
})()
