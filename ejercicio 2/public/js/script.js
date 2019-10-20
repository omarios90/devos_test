var ItemManager = function (strategies) {
  var normalizeItem = function (rawDate, rawCat, rawValue) {
    var cat = rawCat.toUpperCase();
    var value = parseFloat(rawValue);
    var dateParts = rawDate.split("-");
    var date = new Date(dateParts[0], dateParts[1], dateParts[2]);
    var timestamp = date.getTime();
    return {
      cat: cat,
      date: date,
      timestamp: timestamp,
      value: value
    };
  };

  return {
    addItem: function (rawDate, rawCat, rawValue) {
      var normalizedItem = normalizeItem(rawDate, rawCat, rawValue);
      strategies.forEach(function (strategy) {
        strategy.addItem(normalizedItem);
      });
    }
  }
};

var RequestManager = function (isLocal) {
  var getLocalApiRequests = function () {
    var baseUrl = "/api/v1/source/";
    var requests = [
      $.get(baseUrl + "1"),
      $.get(baseUrl + "2"),
      $.get(baseUrl + "3"),
    ];
    return requests;
  };

  var getAWSRequests = function () {
    var baseUrl = "http://s3.amazonaws.com/logtrust-static/test/test/data#.json";
    var requests = [
      $.get(baseUrl.replace("#", "1")),
      $.get(baseUrl.replace("#", "2")),
      $.get(baseUrl.replace("#", "3")),
    ];
    return requests;
  };

  return {
    getRequests: !!isLocal
      ? getLocalApiRequests
      : getAWSRequests
  };
};

function loadData(requestManager, itemManager) {
  var deferred = $.Deferred();
  var requests = requestManager.getRequests();

  $.when.apply(null, requests)
    .done(function (result1, result2, result3) {

      result1[0].forEach(function (item) {
        var date = new Date(item.d).toISOString().substring(0, 10);
        itemManager.addItem(date, item.cat, item.value);
      });

      result2[0].forEach(function (item) {
        var date = item.myDate;
        itemManager.addItem(date, item.categ, item.val);
      });

      result3[0].forEach(function (item) {
        var re1 = /.*?([0-9]{4}-[0-9]{2}-[0-9]{2}).*?/;
        var re2 = /.*?#(CAT\s?[1-9])?#.*?/i;
        var match1 = re1.exec(item.raw);
        var match2 = re2.exec(item.raw);
        var date = match1 && match1[1];
        var cat = match2 && match2[1];
        itemManager.addItem(date, cat, item.val);
      });

    })
    .always(function () {
      deferred.resolve();
    });

  return deferred.promise();
}

window.onload = function () {
  var isLocal = window.location.href.indexOf("localhost") >= 0;

  var strategy1 = new Strategy1();
  var strategy2 = new Strategy2();
  var itemManager = new ItemManager([strategy1, strategy2]);
  var requestManager = new RequestManager(isLocal);
  
  loadData(requestManager, itemManager)
    .then(function () {
      chartFactory("line-chart", "Line chart", TYPE().LINE, strategy1.getData());
      chartFactory("pie-chart", "Pie chart", TYPE().PIE, strategy2.getData());
    });
};
