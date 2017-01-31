"use strict";
/**
 * Created by Isaiah on 2017-01-31.
 */
var ParkingStation = (function () {
    function ParkingStation(title, address, lat, lng, size, available) {
        this.title = title;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.size = size;
        this.available = available;
    }
    return ParkingStation;
}());
exports.ParkingStation = ParkingStation;
//# sourceMappingURL=parkingStation.js.map