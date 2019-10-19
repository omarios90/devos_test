function generateChart(data) {

  Highcharts.chart("line-chart", {

    title: {
      text: "Ejercicio 2"
    },

    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
      borderWidth: 0
    },

    tooltip: {
      shared: true,
      crosshairs: true
    },

    xAxis: {
      type: "datetime",
      tickWidth: 0,
      gridLineWidth: 1,
    },

    yAxis: {
      title: {
        text: null
      },
    },

    series: data,

    credits: { enabled: false }
  });

  Highcharts.chart("pie-chart", {

    title: {
      text: "Ejercicio 2"
    },

    chart: {
      type: "pie"
    },

    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
      borderWidth: 0
    },

    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "<span>{point.name}</span>: {point.percentage:.1f} %"
        }
      }
    },

    series: [{
      data: data
    }],

    credits: { enabled: false }
  });
  
}

function loadData() {
  var baseUrl = "/api/v1/source";
  var requests = [
    $.get(`${baseUrl}/1`),
    $.get(`${baseUrl}/2`),
    $.get(`${baseUrl}/3`),
  ];

  $.when.apply(null, requests)
    .done(function (r1, r2, r3) {
      var groupedMap = {};
      var categoryMap = {};

      function createItem(date, cat, value) {
        cat = cat.toUpperCase();
        value = parseFloat(value);
        var args = date.split("-");
        var dateObj = new Date(args[0], args[1], args[2]);
        var timestamp = dateObj.getTime();
        var groupedKey = cat + timestamp;
        groupedMap[groupedKey] = groupedMap[groupedKey] || { date: timestamp, cat: cat, value: 0.0};
        groupedMap[groupedKey].value += value;
        categoryMap[cat] = categoryMap[cat] || { name: cat, data: [], y: 0.0 };
        categoryMap[cat].y += value;
      }

      var list1 = r1[0];
      list1.forEach(function (item) {
        var date = new Date(item.d).toISOString().substring(0, 10);
        createItem(date, item.cat, item.value);
      });

      var list2 = r2[0];
      list2.forEach(function (item) {
        var date = item.myDate;
        createItem(date, item.categ, item.val);
      });

      var list3 = r3[0];
      list3.forEach(function (item) {
        var re1 = /.*?([0-9]{4}-[0-9]{2}-[0-9]{2}).*?/;
        var re2 = /.*?#(CAT\s?[12])?#.*?/i;
        var match1 = re1.exec(item.raw);
        var match2 = re2.exec(item.raw);
        var date = match1 && match1[1];
        var cat = match2 && match2[1];
        createItem(date, cat, item.val);
      });
      
      var sortedKeys = Object.keys(groupedMap).sort();
      sortedKeys.forEach(function (key) {
        var item = groupedMap[key];
        categoryMap[item.cat].data.push({ x: item.date, y: item.value });
        categoryMap[item.cat].y += item.value;
      });

      generateChart(Object.values(categoryMap));
    });
}

window.onload = function () {
  loadData();
};
