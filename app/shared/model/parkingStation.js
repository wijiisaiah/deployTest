"use strict";
/**
 * Created by Isaiah on 2017-01-31.
 */
var ParkingStation = (function () {
    function ParkingStation(title, address, type, lat, lng, size, availableSpots, availability, rate) {
        this.title = title;
        this.address = address;
        this.type = type;
        this.lat = lat;
        this.lng = lng;
        this.size = size;
        this.availableSpots = availableSpots;
        this.availability = availability;
        this.rate = rate;
    }
    return ParkingStation;
}());
exports.ParkingStation = ParkingStation;
//# sourceMappingURL=parkingStation.js.map