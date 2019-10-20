function TYPE() {
    return {
        PIE: "PIE",
        LINE: "LINE"
    };
}

function chartFactory(id, title, type, data, extraSpec) {
    var spec, baseSpec = {
        title: { text: title },
        credits: { enabled: false },
        legend: {
            align: "right",
            verticalAlign: "middle",
            layout: "vertical",
            borderWidth: 0
        }
    };

    data = data || {};
    extraSpec = extraSpec || {};

    switch (type) {
        case (TYPE().LINE):
            spec = lineChartSpec(data, baseSpec, extraSpec);
            break;
        case (TYPE().PIE):
            spec = pieChartSpec(data, baseSpec, extraSpec);
            break;
    }

    Highcharts.chart(id, spec);
}

function lineChartSpec(data, baseSpec, extraSpec) {
    var spec = Object.assign({}, {
        xAxis: { type: "datetime" },
        yAxis: { title: { text: null } },
        series: data,
    }, baseSpec, extraSpec);
    return spec;
}

function pieChartSpec(data, baseSpec, extraSpec) {
    var spec = Object.assign({}, {
        chart: { type: "pie" },
        plotOptions: {
            pie: {
                dataLabels: {
                    format: "{point.name}: {point.percentage:.1f} %"
                }
            }
        },
        series: [{ data: data }],
    }, baseSpec, extraSpec);
    return spec;
}
