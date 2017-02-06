"use strict";
/**
 * Created by Isaiah on 2017-02-03.
 */
var Time = (function () {
    function Time() {
    }
    Time.getCurrentDate = function () {
        var d = new Date();
        var day = d.getDate().toString();
        var month = d.getMonth().toString();
        var year = d.getFullYear().toString();
        if (day.length < 2) {
            day = "0" + day;
        }
        if (month.length < 2) {
            month = "0" + month;
        }
        return month + "/" + day + "/" + year;
    };
    Time.getCurrentTime = function () {
        var d = new Date();
        var second = d.getSeconds().toString();
        var minutes = d.getMinutes().toString();
        var hour = d.getHours().toString();
        if (second.length < 2) {
            second = "0" + second;
        }
        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }
        if (hour.length < 2) {
            hour = "0" + hour;
        }
        return hour + ":" + minutes + ":" + second;
    };
    return Time;
}());
exports.Time = Time;
//# sourceMappingURL=Time.js.map