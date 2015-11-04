requirejs.config({baseUrl:".",paths:{jquery:"lib/jquery/dist/jquery.min","jquery-ui":"lib/jquery-ui/jquery-ui.min",highstock:"lib/highstock/highstock","highcharts-exporting":"lib/highstock/modules/exporting","highcharts-theme":"lib/highstock/themes/sand-signika","jquery.dialogextend":"lib/binary-com-jquery-dialogextended/jquery.dialogextend.min","jquery-growl":"lib/growl/javascripts/jquery.growl","jquery-validation":"lib/jquery-validation/dist/jquery.validate.min",modernizr:"lib/modernizr/modernizr","reconnecting-websocket":"lib/reconnectingWebsocket/reconnecting-websocket.min",lokijs:"lib/lokijs/build/lokijs.min","jquery-timer":"lib/jquery.timers/jquery.timers.min","color-picker":"lib/colorpicker/jquery.colorpicker",datatables:"lib/datatables/media/js/jquery.dataTables.min","datatables-jquery-ui":"lib/datatables/media/js/dataTables.jqueryui.min",currentPriceIndicator:"charts/indicators/highcharts_custom/currentprice",indicator_base:"charts/indicators/highcharts_custom/indicator_base","es6-promise":"lib/es6-promise/promise.min","js-cookie":"lib/js-cookie/src/js.cookie",loadCSS:"lib/loadcss/loadCSS"},shim:{"jquery-ui":{deps:["jquery"]},highstock:{deps:["jquery"]},"highcharts-exporting":{deps:["highstock"]},"highcharts-theme":{deps:["highstock"]},"jquery-growl":{deps:["jquery"]},"jquery-timer":{deps:["jquery"]},datatables:{deps:["jquery-ui"]},currentPriceIndicator:{deps:["highstock"]}}}),require(["jquery","jquery-ui","modernizr","loadCSS","common/util"],function(a){"use strict";function b(){require(["affiliates/affiliates"],function(a){a.init()})}function c(){var b=function(a){load_ondemand(a.find("a.tradingTimes"),"click","Loading Trading Times ...","tradingtimes/tradingTimes",function(b){var c=a.find("a.tradingTimes");b.init(c),c.click()}),load_ondemand(a.find("a.assetIndex"),"click","loading Asset Index ...","assetindex/assetIndex",function(b){var c=a.find("a.assetIndex");b.init(c),c.click()}),load_ondemand(a.find("a.profitTable"),"click","loading Profit Table ...","profittable/profitTable",function(b){var c=a.find("a.profitTable");b.init(c),c.click()})};require(["navigation/navigation"],function(c){c.init(b),a("#menu").menu(),require(["instruments/instruments"],function(a){require(["jquery","jquery-growl"],function(a){a.growl.notice({message:"Loading chart menu!"})}),a.init()}),require(["windows/windows"],function(b){var c=a("#nav-menu .windows");b.init(c),a(".sk-spinner-container").hide()})})}return Modernizr.svg?(loadCSS("lib/jquery-ui/themes/smoothness/jquery-ui.min.css"),loadCSS("lib/growl/stylesheets/jquery.growl.css"),loadCSS("main.css"),void onloadCSS(loadCSS("navigation/navigation.css"),function(){a(window).load(function(){var a=getParameterByName("affiliates")||!1;"true"==a?b():c(),loadCSS("lib/hamburger.css"),loadCSS("charts/charts.css"),loadCSS("lib/datatables/media/css/jquery.dataTables.min.css"),loadCSS("lib/datatables/media/css/dataTables.jqueryui.min.css"),loadCSS("lib/colorpicker/jquery.colorpicker.css");var d=getParameterByName("gtm")||!0;"true"==d&&require(["gtm/gtm"],function(a){a.init()})})})):void(window.location.href="unsupported_browsers.html")});