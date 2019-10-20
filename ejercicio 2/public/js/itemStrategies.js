var StrategyBase = function () { };
StrategyBase.prototype = {
    generateKey: function (item) {
        throw "method 'generateKey' should be implemented in strategy";
    },
    defaultCustomItem: function (item) {
        return { timestamp: item.timestamp, cat: item.cat, value: 0.0 };
    },
    addItem: function (item) {
        var key = this.generateKey(item);
        this.customItems[key] = this.customItems[key] || this.defaultCustomItem(item);
        this.customItems[key].value += item.value;
    },
    getData: function () {
        throw "method 'getData' should be implemented in strategy";
    },
}

function Strategy1() {
    this.customItems = {};

    this.generateKey = function (item) {
        return item.cat + item.timestamp;
    };

    this.getData = function () {
        var sortedKeys = Object.keys(this.customItems).sort();
        var resultMap = sortedKeys.reduce(function (map, key) {
            var item = this.customItems[key];
            map[item.cat] = map[item.cat] || { name: item.cat, data: [] };
            map[item.cat].data.push({ x: item.timestamp, y: item.value });
            return map;
        }.bind(this), {});
        return Object.values(resultMap);
    };
}
Strategy1.prototype = Object.create(StrategyBase.prototype);

function Strategy2() {
    this.customItems = {};

    this.generateKey = function (item) {
        return item.cat;
    };

    this.getData = function () {
        return Object.values(this.customItems).map(function (item) {
            return { name: item.cat, y: item.value };
        });
    };
}
Strategy2.prototype = Object.create(StrategyBase.prototype);
