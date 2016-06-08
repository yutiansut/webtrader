﻿/**
 * Created by Mahboob.M on 12/28/15
 */

define(["jquery", "common/rivetsExtra", "jquery-ui", 'color-picker'], function ($, rv) {

    function closeDialog() {
        $(this).dialog("close");
        $(this).find("*").removeClass('ui-state-error');
    }

    function init(containerIDWithHash, _callback) {

        require(['text!charts/indicators/cdlxsidegap3methods/cdlxsidegap3methods.html', 'text!charts/indicators/indicators.json'], function ($html, data) {

            $html = $($html);

            $html.appendTo("body");

            data = JSON.parse(data);
            var current_indicator_data = data.cdlxsidegap3methods;
            var state = {
                "title": current_indicator_data.long_display_name,
                "description": current_indicator_data.description
            }
            rv.bind($html[0], state);

            $html.dialog({
                autoOpen: false,
                resizable: false,
                width: 350,
                modal: true,
                my: 'center',
                at: 'center',
                of: window,
                buttons: [
                    {
                        text: "OK",
                        click: function () {
                            var series = $($(".cdlxsidegap3methods").data('refererChartID')).highcharts().series[0];
                            series.addIndicator('cdlxsidegap3methods', {
                                cdlIndicatorCode : 'cdlxsidegap3methods',
                                onSeriesID : series.options.id
                            });
                            closeDialog.call($html);
                        }
                    },
                    {
                        text: "Cancel",
                        click: function () {
                            closeDialog.call(this);
                        }
                    }
                ]
            });

            if ($.isFunction(_callback)) {
                _callback(containerIDWithHash);
            }

        });

    }

    return {

        open: function (containerIDWithHash) {

            if ($(".cdlxsidegap3methods").length == 0) {
                init(containerIDWithHash, this.open);
                return;
            }

            $(".cdlxsidegap3methods").data('refererChartID', containerIDWithHash).dialog("open");

        }

    };

});