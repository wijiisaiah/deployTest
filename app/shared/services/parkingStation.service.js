"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var firebase_config_service_1 = require("../../core/service/firebase-config.service");
var Rx_1 = require("rxjs/Rx");
/**
 * Created by Isaiah on 2017-02-06.
 */
var ParkingService = (function () {
    function ParkingService(fire) {
        this.fire = fire;
        this.databaseRef = this.fire.database;
        this.parkingStationsRef = this.databaseRef.ref('/parking stations');
        this.getAddedParkingStations();
    }
    ParkingService.prototype.getAddedParkingStations = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.parkingStationsRef.on('child_added', function (parking) {
                var newParking = parking.val();
                obs.next(newParking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    ParkingService.prototype.getUpdatedParkingStation = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.parkingStationsRef.on('child_changed', function (parkingStation) {
                var updatedParkingStation = parkingStation.val();
                obs.next(updatedParkingStation);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    ParkingService.prototype.incrementAvailability = function (id) {
        var availability;
        var parkingStationsRef = this.parkingStationsRef.child(id);
        parkingStationsRef.once('value').then(function (snapshot) {
            availability = snapshot.val().availableSpots;
            availability++;
            parkingStationsRef.update({
                availableSpots: availability
            })
                .catch(function (err) { return console.error("Unable to increment", err); });
        });
    };
    ParkingService.prototype.decrementAvailability = function (id) {
        var availability;
        var parkingStationsRef = this.parkingStationsRef.child(id);
        parkingStationsRef.once('value').then(function (snapshot) {
            availability = snapshot.val().availableSpots;
            availability--;
            parkingStationsRef.update({
                availableSpots: availability
            })
                .catch(function (err) { return console.error("Unable to decrement", err); });
        });
    };
    ParkingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], ParkingService);
    return ParkingService;
}());
exports.ParkingService = ParkingService;
//# sourceMappingURL=parkingStation.service.js.map