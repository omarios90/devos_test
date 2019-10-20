function itemManager(strategies) {
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
}

function loadData(manager) {
  var deferred = $.Deferred();
  var baseUrl = "/api/v1/source/";
  var requests = [
    $.get(baseUrl + "1"),
    $.get(baseUrl + "2"),
    $.get(baseUrl + "3"),
  ];

  $.when.apply(null, requests)
    .done(function (result1, result2, result3) {

      result1[0].forEach(function (item) {
        var date = new Date(item.d).toISOString().substring(0, 10);
        manager.addItem(date, item.cat, item.value);
      });

      result2[0].forEach(function (item) {
        var date = item.myDate;
        manager.addItem(date, item.categ, item.val);
      });

      result3[0].forEach(function (item) {
        var re1 = /.*?([0-9]{4}-[0-9]{2}-[0-9]{2}).*?/;
        var re2 = /.*?#(CAT\s?[1-9])?#.*?/i;
        var match1 = re1.exec(item.raw);
        var match2 = re2.exec(item.raw);
        var date = match1 && match1[1];
        var cat = match2 && match2[1];
        manager.addItem(date, cat, item.val);
      });

    })
    .always(function () {
      deferred.resolve();
    });

  return deferred.promise();
}

window.onload = function () {
  var strategy1 = new Strategy1();
  var strategy2 = new Strategy2();
  var manager = new itemManager([strategy1, strategy2]);
  loadData(manager)
    .then(function () {
      chartFactory("line-chart", "Line chart", TYPE().LINE, strategy1.getData());
      chartFactory("pie-chart", "Pie chart", TYPE().PIE, strategy2.getData());
    });
};
