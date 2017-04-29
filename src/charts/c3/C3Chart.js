var c3chart = function (userConfig) {
  var chart;
  var internalChart;

  var defaults = {
    // The parent container of this chart.
    'parent': '#C3ChartParent',
    'id': 'C3ChartId',
    'class': 'C3ChartClass',
    'resizable': true,
    'width': "100%",
    'height': "100%",
    'margin': {
      'left': 50,
      'right': 50,
      'top': 20,
      'bottom': 20
    },
    "color": d3.scale.category10(),
    "draggable": false,
    'csv': {
      'header': [],
      'data': []
    },
    'options': {
      "tooltip.show": true,
      "subchart.show": false,
      "zoom.enabled": true,
      "point.show": true,
      "legend.position": "right"
    },
  };

  chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    var config = chart.config;
    var csv = config.csv;
    d3 = dex.charts.d3.d3v3;
    d3.select(config.parent).selectAll("*").remove();

    config.options.padding =
      config.options.padding || config.margin;
    config.options.bindto = config.parent;
    var dataOptions = getDataOptions(csv);
    //dex.console.log("PRE-OPTS", config.options);
    config.options =
      dex.config.expandAndOverlay(config.options,
        getDataOptions(csv));
    //dex.console.log("C3OPTIONS", JSON.stringify(config.options));
    internalChart = c3.generate(config.options);
    chart.resize();
    dex.config.apply(chart);
    return chart;
  };

  function getDataOptions(csv) {
    var options = {};
    var gtypes = dex.csv.guessTypes(csv);
    var ncsv = dex.csv.numericSubset(csv);
    var columns = dex.csv.transpose(csv);

    ncsv.data.unshift(ncsv.header);
    // Categorical axis
    if (gtypes[0] == "string") {
      // Donut an pie charts are a special case
      if (chart.config && chart.config.options &&
        chart.config.options.data && (
          chart.config.options.data.type == "pie" ||
          chart.config.options.data.type == "donut"
        )) {
        var summary = dex.csv.summary(csv, [0]);

        return {
          data: {
            "columns": summary.data,
            "color": chart.config.color
          }
        }
      }
      else {
        options = {
          data: {
            "rows": ncsv.data,
            "color": chart.config.color
          },
          axis: {
            x: {
              type: "category",
              categories: columns.data[0]
            }
          }
        };
        if (chart.config.stack) {
          options.data.groups = [ncsv.header];
        }
        return options;
      }
    }
    else if (gtypes[0] == "date") {
      var numericIndices = dex.csv.getNumericIndices(csv);
      numericIndices.unshift(0);
      var tcsv = dex.csv.columnSlice(csv, numericIndices);
      tcsv.data.unshift(tcsv.header);
      options = {
        data: {
          "x": tcsv.header[0],
          "rows": tcsv.data,
          "color": chart.config.color
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      };

      if (chart.config.stack) {
        options.data.groups = [ncsv.header];
      }
      return options;
    }
    else {
      options = {
        data: {
          "x": ncsv.header[0],
          "rows": ncsv.data,
          "color": chart.config.color
        }
      };

      if (chart.config.stack) {
        options.data.groups = [dex.array.copy(ncsv.header)];
        options.data.groups[0].shift();
      }
      return options;
    }
  }

  chart.update = function () {
    var config = chart.config;
    var csv = config.csv;
    var dataOptions = getDataOptions(csv);
    config.options =
      dex.config.expandAndOverlay(config.options,
        getDataOptions(config.csv));
    internalChart.load(config.options);
    dex.config.apply(chart);
    return chart;
  };

    chart.clone = function clone(override) {
        return c3chart(dex.config.expandAndOverlay(override, userConfig));
    };

  $(document).ready(function () {
    if (chart.config.draggable) {
      $("#" + chart.config.id).draggable();
    }
  });

  return chart;
};

module.exports = c3chart;