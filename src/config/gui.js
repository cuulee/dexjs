/**
 *
 * gui definition module.
 * @module dex/config/gui
 *
 */

module.exports = function gui(dex) {
  return {
    'dimensions': function dimensions(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Chart Dimensions",
        "contents": [
          {
            "name": "Height",
            "description": "The height of the chart.",
            "target": ns + "height",
            "type": "int",
            "minValue": 0,
            "maxValue": 2000,
            "initialValue": 600
          },
          {
            "name": "Width",
            "description": "The width of the chart.",
            "target": ns + "width",
            "type": "int",
            "minValue": 0,
            "maxValue": 2000,
            "initialValue": 800
          },
          {
            "name": "Top Margin",
            "description": "The top margin of the chart.",
            "target": ns + "margin.top",
            "type": "int",
            "minValue": 0,
            "maxValue": 500,
            "initialValue": 50
          },
          {
            "name": "Bottom Margin",
            "description": "The bottom margin of the chart.",
            "target": ns + "margin.bottom",
            "type": "int",
            "minValue": 0,
            "maxValue": 500,
            "initialValue": 50
          },
          {
            "name": "Left Margin",
            "description": "Left top margin of the chart.",
            "target": "margin.left",
            "type": "int",
            "minValue": 0,
            "maxValue": 500,
            "initialValue": 50
          },
          {
            "name": "Right Margin",
            "description": "The right margin of the chart.",
            "target": "margin.right",
            "type": "int",
            "minValue": 0,
            "maxValue": 500,
            "initialValue": 50
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'font': function font(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Font",
        "contents": [
          {
            "name": "Font Size",
            "description": "The size of the font.",
            "target": ns + "size",
            "type": "int",
            "minValue": 1,
            "maxValue": 256,
            "initialValue": 12
          },
          {
            "name": "Font Family",
            "description": "The font family.",
            "target": ns + "family",
            "type": "choice",
            "choices": ["courier", "sans-serif", "times-roman"],
            "initialValue": "sans-serif"
          },
          {
            "name": "Font Style",
            "description": "The font style.",
            "target": ns + "style",
            "type": "choice",
            "choices": ["normal", "italic", "oblique", "inherit"],
            "initialValue": "normal"
          },
          {
            "name": "Font Weight",
            "description": "The weight of the font.",
            "target": "weight",
            "type": "choice",
            "choices": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500",
              "600", "700", "800", "900"],
            "initialValue": "normal"
          },
          {
            "name": "Font Variant",
            "description": "The font variant.",
            "target": "variant",
            "type": "choice",
            "choices": ["normal", "inherit", "small-caps"],
            "initialValue": "normal"
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'text': function text(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Text",
        "contents": [
          {
            "type": "group",
            "name": "General",
            "contents": [
              {
                "name": "Transform",
                "description": "A transform to be applied to the text.",
                "target": ns + "transform",
                "type": "string",
                "initialValue": ""
              },
              {
                "name": "Format",
                "description": "The text format.",
                "target": ns + "format",
                "type": "string",
                "initialValue": ""
              },
              {
                "name": "Anchor",
                "description": "The text anchor.",
                "target": ns + "anchor",
                "type": "choice",
                "choices": ["middle", "start", "end"],
                "initialValue": "middle"
              },
              {
                "name": "X Offset",
                "description": "The x offset of the text.",
                "target": ns + "dx",
                "type": "int",
                "minValue": -2000,
                "maxValue": 2000,
                "initialValue": 0
              },
              {
                "name": "Y Offset",
                "description": "The y offset of the text.",
                "target": ns + "dy",
                "type": "int",
                "minValue": -2000,
                "maxValue": 2000,
                "initialValue": 0
              },
              {
                "name": "Text Decoration",
                "description": "The text decoration.",
                "target": ns + "decoration",
                "type": "choice",
                "choices": ["none", "underline", "overline", "line-through", "blink", "inherit"],
                "initialValue": "none"
              },
              {
                "name": "Writing Mode",
                "description": "The text writing mode family.",
                "target": ns + "writingMode",
                "type": "choice",
                "choices": ["inherit", "lr-tb", "rl-tb", "tb-rl", "lr", "rl", "tb"],
                "initialValue": "inherit"
              },
              {
                "name": "Text Length",
                "description": "The text length.",
                "target": ns + "textLength",
                "type": "int",
                "minValue": 1,
                "maxValue": 2000,
                "initialValue": ""
              },
              {
                "name": "Length Adjust",
                "description": "The text length adjustment.",
                "target": ns + "lengthAdjust",
                "type": "choice",
                "choices": ["", "spacing", "spacingAndGlyphs"],
                "initialValue": ""
              }
            ]
          },
          dex.config.gui.font(config.font || {}, ns + "font"),
          dex.config.gui.fill(config.fill || {}, ns + "fill"),
          dex.config.gui.stroke(config.stroke || {}, ns + "stroke")
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'editableText': function text(config, prefix) {
      var config = dex.config.gui.text(config, prefix);
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      config.contents[0].contents.unshift(
        {
          "name": "Text Contents",
          "description": "The text.",
          "target": ns + "text",
          "type": "string",
          "initialValue": ""
        }
      );
      return config;
    },
    'fill': function fill(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Fill",
        "contents": [
          {
            "name": "Fill",
            "description": "The fill color or none.",
            "target": ns + "fillColor",
            "type": "color",
            "colors": ["none", "black", "white", "red", "green",
              "blue", "orange", "yellow", "pink", "gray", "maroon",
              "teal", "cyan", "navy", "steelblue", "olive", "silver"],
            "initialValue": "none"
          },
          {
            "name": "Fill Opacity",
            "description": "The text anchor.",
            "target": ns + "fillOpacity",
            "type": "float",
            "minValue": 0.0,
            "maxValue": 1.0,
            "initialValue": 1.0
          },
          {
            "name": "Fill Rule",
            "description": "The fill color or none.",
            "target": ns + "fillRule",
            "type": "choice",
            "choices": ["nonzero", "evenodd", "inherit"],
            "initialValue": "nonzero"
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'link': function link(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Link",
        "contents": [
          dex.config.gui.fill(config.fill || {}, ns + "fill"),
          dex.config.gui.stroke(config.stroke || {}, ns + "stroke")
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'stroke': function stroke(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Stroke",
        "contents": [
          {
            "name": "Width",
            "description": "The fill color or none.",
            "target": ns + "width",
            "type": "float",
            "minValue": 0.0,
            "maxValue": 10.0,
            "initialValue": 1.0
          },
          {
            "name": "Color",
            "description": "The stroke color.",
            "target": ns + "color",
            "type": "choice",
            "choices": ["none", "red", "green", "blue", "black", "white", "yellow",
              "purple", "orange", "pink", "cyan", "steelblue", "grey",],
            "initialValue": "black"
          },
          {
            "name": "Color",
            "description": "The stroke color.",
            "target": ns + "color",
            "type": "color"
          },
          {
            "name": "Opacity",
            "description": "The stroke opacity.",
            "target": ns + "opacity",
            "type": "float",
            "minValue": 0.0,
            "maxValue": 1.0,
            "initialValue": 1.0
          },
          {
            "name": "Dash Array",
            "description": "The stroke dash array.",
            "target": ns + "dasharray",
            "type": "string",
            "initialValue": ""
          },
          {
            "name": "transform",
            "description": "The stroke transformation.",
            "target": ns + "transform",
            "type": "string",
            "initialValue": ""
          },
          {
            "name": "Line Cap",
            "description": "The line cap.",
            "target": ns + "lineCap",
            "type": "choice",
            "choices": ["inherit", "butt", "round", "square"],
            "initialValue": "inherit"
          },
          {
            "name": "Line Join",
            "description": "The line join.",
            "target": ns + "lineJoin",
            "type": "choice",
            "choices": ["miter", "round", "bevel", "inherit"],
            "initialValue": "miter"
          },
          {
            "name": "Miter Limit",
            "description": "The miter limit.",
            "target": ns + "miterLimit",
            "type": "float",
            "minValue": 0.0,
            "maxValue": 20.0,
            "initialValue": 4.0
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'general': function general(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "General",
        "contents": [
          {
            "name": "Resizable",
            "description": "This determines whether the chart is resizable or not.",
            "target": ns + "resizable",
            "type": "boolean",
            "initialValue": true
          },
          {
            "name": "Draggable",
            "description": "This determines whether the chart is draggable or not.",
            "target": ns + "draggable",
            "type": "boolean",
            "initialValue": false
          },
          {
            "name": "Transform",
            "description": "A transform to be applied to the chart.",
            "target": ns + "transform",
            "type": "string",
            "initialValue": ""
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'circle': function circle(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Circle",
        "contents": [
          {
            "type": "group",
            "name": "General",
            "contents": [
              {
                "name": "Radius",
                "description": "This determines the radius of the circle.",
                "target": ns + "r",
                "type": "float",
                "minValue": 0,
                "maxValue": 200,
                "initialValue": 5
              },
              {
                "name": "Transform",
                "description": "A transform to be applied to the circle.",
                "target": ns + "transform",
                "type": "string",
                "initialValue": ""
              }
            ]
          },
          dex.config.gui.fill(config.fill || {}, ns + "fill"),
          dex.config.gui.stroke(config.stroke || {}, ns + "stroke")
        ]
      };
      dex.config.gui.fill(config, ns + "fill");
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'path': function path(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Path",
        "contents": [
          dex.config.gui.fill(config.fill || {}, ns + "fill"),
          dex.config.gui.stroke(config.stroke || {}, ns + "stroke")
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'brush': function path(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Brush",
        "contents": [
          {
            "type": "group",
            "name": "Dimensions and Color",
            "contents": [
              {
                "name": "Brush Color",
                "type": "color",
                "target": ns + "color",
                "description": "Brush color",
                "intialValue": "steelblue"
              },
              {
                "name": "Brush Opacity",
                "type": "float",
                "target": ns + "opacity",
                "minValue": 0,
                "maxValue": 1,
                "description": "Brush color",
                "intialValue": .8
              },
              {
                "name": "Brush Width",
                "type": "int",
                "description": "Brush Width",
                "target": ns + "width",
                "minValue": 0,
                "maxValue": 30,
                "intialValue": 12
              },
              {
                "name": "Brush X Offset",
                "type": "int",
                "description": "Brush X Offset",
                "target": ns + "x",
                "minValue": -30,
                "maxValue": 30,
                "intialValue": -6
              }
            ]
          },
          dex.config.gui.stroke(config.stroke || {}, ns + "stroke")
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'rectangle': function circle(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Rectangle",
        "contents": [
          {
            "type": "group",
            "name": "General",
            "contents": [
              {
                "name": "Height",
                "description": "This determines the height of the rectangle.",
                "target": ns + "height",
                "type": "float",
                "minValue": 0,
                "maxValue": 200,
                "initialValue": 5
              },
              {
                "name": "Width",
                "description": "This determines the width of the rectangle.",
                "target": ns + "width",
                "type": "float",
                "minValue": 0,
                "maxValue": 200,
                "initialValue": 5
              },
              {
                "name": "X Radius",
                "description": "The x radius.",
                "target": ns + "rx",
                "type": "float",
                "minValue": 0,
                "maxValue": 200,
                "initialValue": 0
              },
              {
                "name": "Y Radius",
                "description": "The y radius.",
                "target": ns + "ry",
                "type": "float",
                "minValue": 0,
                "maxValue": 200,
                "initialValue": 0
              },
              {
                "name": "Transform",
                "description": "A transform to be applied to the rectangle.",
                "target": ns + "transform",
                "type": "string",
                "initialValue": ""
              }
            ]
          },
          dex.config.gui.fill(config.fill || {}, ns + "fill"),
          dex.config.gui.stroke(config.stroke || {}, ns + "stroke")
        ]
      };
      dex.config.gui.fill(config, ns + "fill");
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    // ECharts configuration:
    'echartsTextStyle': function fill(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Text Style",
        "contents": [
          {
            "name": "Text Color",
            "description": "The color of the text.",
            "target": ns + "color",
            "type": "color",
            "initialValue": "#ffffff"
          },
          {
            "name": "Font Style",
            "description": "The color of the text.",
            "target": ns + "fontStyle",
            "type": "choice",
            "choices": ["normal", "italic", "oblique"],
            "initialValue": "normal"
          },
          {
            "name": "Font Weight",
            "description": "The weight of the text.",
            "target": ns + "fontWeight",
            "type": "choice",
            "choices": ["normal", "bold", "bolder", "lighter",
              "100", "200", "300", "400", "500", "600", "700",
              "800", "900"],
            "initialValue": "normal"
          },
          {
            "name": "Font Family",
            "description": "The color of the text.",
            "target": ns + "fontFamily",
            "type": "choice",
            "choices": [
              "sans-serif", "arial", "courier", "courier new",
              "arial narrow", "allegro", "lucidia console",
              "lucida sans", "times", "arial rounded mt bold"
            ],
            "initialValue": "sans-serif"
          },
          {
            "name": "Font Size",
            "description": "The font family.",
            "target": ns + "fontSize",
            "type": "int",
            "minValue": 0,
            "maxValue": 128,
            "initialValue": 12
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'echartsLabel': function fill(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Label",
        "contents": [
          dex.config.gui.echartsTextStyle(config.textStyle || {},
            ns + "textStyle"),
          {
            "name": "Show Label",
            "description": "Show or hide the label.",
            "target": ns + "show",
            "type": "boolean",
            "initialValue": false
          },
          {
            "name": "Position",
            "description": "Position of the label.",
            "target": ns + "position",
            "type": "choice",
            "choices": ["top", "left", "right", "bottom",
              "inside", "insideLeft", "insideRight", "insideTop",
              "insideBottom", "insideLeftTop", "insideLeftBottom",
              "insideRightTop", "insideRightBottom"],
            "initialValue": "top"
          },
          {
            "name": "Formatter",
            "description": "Formatter of the label.",
            "target": ns + "formatter",
            "type": "string",
            "initialValue": ""
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'echartsItemStyle': function fill(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Item Style",
        "contents": [
          {
            "name": "Color",
            "description": "Color.",
            "target": ns + "color",
            "type": "color",
            "initialValue": "#aaa"
          },
          {
            "name": "Border Color",
            "description": "Border color.",
            "target": ns + "borderColor",
            "type": "color",
            "initialValue": "#aaa"
          },
          {
            "name": "Border Width",
            "description": "Border Width.",
            "target": ns + "borderWidth",
            "type": "float",
            "minValue": 0,
            "maxValue": 10,
            "initialValue": 1
          },
          {
            "name": "Shadow Blur",
            "description": "Shadow blur.",
            "target": ns + "shadowBlur",
            "type": "float",
            "minValue": 0,
            "maxValue": 20,
            "initialValue": 0
          },
          {
            "name": "Shadow Color",
            "description": "Shadow color.",
            "target": ns + "shadowColor",
            "type": "color",
            "initialValue": "#aaa"
          },
          {
            "name": "Opacity",
            "description": "Opacity.",
            "target": ns + "opacity",
            "type": "float",
            "minValue": 0,
            "maxValue": 1,
            "initialValue": 1
          },
          {
            "name": "Border Type",
            "description": "Border type.",
            "target": ns + "borderType",
            "type": "choice",
            "choices": ["solid", "dashed", "dotted"],
            "initialValue": "solid"
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'echartsLineStyle': function fill(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Line Style",
        "contents": [
          {
            "name": "Color",
            "description": "Line color.",
            "target": ns + "color",
            "type": "color",
            "initialValue": "#aaa"
          },
          {
            "name": "Width",
            "description": "Line Width.",
            "target": ns + "width",
            "type": "float",
            "minValue": 0,
            "maxValue": 10,
            "initialValue": 1
          },
          {
            "name": "Shadow Blur",
            "description": "Shadow blur.",
            "target": ns + "shadowBlur",
            "type": "float",
            "minValue": 0,
            "maxValue": 20,
            "initialValue": 0
          },
          {
            "name": "Shadow Color",
            "description": "Shadow color.",
            "target": ns + "shadowColor",
            "type": "color",
            "initialValue": "#aaa"
          },
          {
            "name": "Opacity",
            "description": "Opacity.",
            "target": ns + "opacity",
            "type": "float",
            "minValue": 0,
            "maxValue": 1,
            "initialValue": 1
          },
          {
            "name": "Curveness",
            "description": "Curveness.",
            "target": ns + "curveness",
            "type": "float",
            "minValue": 0,
            "maxValue": 1,
            "initialValue": 0
          }
        ]
      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    'echartsTitle': function fill(config, prefix) {
      var ns = (typeof prefix !== 'undefined') ? (prefix + ".") : "";
      var userConfig = config || {};
      var defaults = {
        "type": "group",
        "name": "Title",
        "contents": [
          {
            "name": "Text",
            "description": "The text.",
            "target": ns + "text",
            "type": "string",
            "initialValue": ""
          },
          {
            "name": "Sub Text",
            "description": "The subtext.",
            "target": ns + "subtext",
            "type": "string",
            "initialValue": ""
          },
          {
            "name": "Link",
            "description": "An optional hyperlink.",
            "target": ns + "link",
            "type": "string",
            "initialValue": ""
          },
          {
            "name": "Link Target",
            "description": "A tab target to open hyperlink in.",
            "target": ns + "target",
            "type": "string",
            "initialValue": ""
          },
          {
            "name": "Horizontal Alignment",
            "description": "Text alignment.",
            "target": ns + "textAlign",
            "type": "choice",
            "choices": ["left", "center", "right"],
            "initialValue": "center"
          },
          {
            "name": "Vertical Alignment",
            "description": "Vertical alignment of title.",
            "target": ns + "textBaseline",
            "type": "choice",
            "choices": ["top", "middle", "bottom"],
            "initialValue": "top"
          },
          {
            "name": "Sub Link",
            "description": "An optional hyperlink.",
            "target": ns + "sublink",
            "type": "string",
            "initialValue": ""
          },
          {
            "name": "Sub Link Target",
            "description": "A tab target to open hyperlink in.",
            "target": ns + "subtarget",
            "type": "string",
            "initialValue": ""
          },
          dex.config.gui.echartsTextStyle(config.textStyle || {}, ns + "textStyle"),
          dex.config.gui.echartsTextStyle(config.subtextStyle || {}, ns + "subtextStyle")
        ]

      };
      return dex.config.expandAndOverlay(userConfig, defaults);
    },
    // Utility functions here:
    'disable': function disable(config, field) {
      if (config.type == "group") {
        config.contents.forEach(function (elt, i) {
          if (elt.hasOwnProperty("target") && elt.target == field) {
            delete config.contents[i];
          }
          else {
            disable(elt, field);
          }
        })
      }

      return config;
    },
    'sync': function sync(chart, guiDef) {
      if (guiDef.type == "group") {
        guiDef.contents.forEach(function (elt, i) {
          sync(chart, elt);
        })
      }
      else {
        var value = chart.attr(guiDef.target);
        var valueType = typeof value;
        if (valueType != "undefined" && valueType != "function") {
          guiDef.initialValue = value;
          //dex.console.log(guiDef.target + "=" + chart.attr(guiDef.target));
        }
      }

      return guiDef;
    }
  };
};