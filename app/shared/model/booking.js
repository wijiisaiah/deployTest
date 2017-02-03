"use strict";
/**
 * Created by Isaiah on 2017-02-02.
 */
var Booking = (function () {
    function Booking(parkingStation, date, startTime, endTime, totalCost) {
        this.parkingStation = parkingStation;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalCost = totalCost;
    }
    return Booking;
}());
exports.Booking = Booking;
//# sourceMappingURL=booking.js.map