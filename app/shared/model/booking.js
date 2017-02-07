"use strict";
/**
 * Created by Isaiah on 2017-02-02.
 */
var Booking = (function () {
    function Booking(parkingStation, date, startTime, startTimeMs, endTime, cost) {
        this.parkingStation = parkingStation;
        this.date = date;
        this.startTime = startTime;
        this.startTimeMs = startTimeMs;
        this.endTime = endTime;
        this.cost = cost;
    }
    return Booking;
}());
exports.Booking = Booking;
//# sourceMappingURL=booking.js.map