"use strict";
/**
 * Created by Isaiah on 2017-02-03.
 */
var Time = (function () {
    function Time() {
    }
    Time.prototype.getCurrentDate = function () {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        return month + " " + day + ", " + year;
    };
    Time.prototype.getCurrentTime = function () {
        var d = new Date();
        var second = d.getSeconds().toString();
        var minutes = d.getMinutes().toString();
        var hour = d.getHours().toString();
        if (second.length < 2) {
            second = "0" + second;
        }
        if (minutes.length < 2) {
            second = "0" + second;
        }
        if (hour.length < 2) {
            second = "0" + second;
        }
        return hour + ":" + minutes + ":" + second;
    };
    return Time;
}());
exports.Time = Time;
//# sourceMappingURL=Time.js.map