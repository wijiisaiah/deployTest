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
var Rx_1 = require("rxjs/Rx");
var firebase_config_service_1 = require("../../../core/service/firebase-config.service");
/**
 * Created by Isaiah on 2017-02-06.
 */
var AdminParkingService = (function () {
    function AdminParkingService(fire) {
        this.fire = fire;
        this.databaseRef = this.fire.database;
        this.parkingStationsRef = this.databaseRef.ref('/parking stations');
    }
    AdminParkingService.prototype.getAddedParkingStations = function () {
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
    AdminParkingService.prototype.getUpdatedParkingStations = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.parkingStationsRef.on('child_changed', function (parking) {
                var newParking = parking.val();
                obs.next(newParking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AdminParkingService.prototype.getRemovedParkingStations = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.parkingStationsRef.on('child_removed', function (parking) {
                var newParking = parking.val();
                obs.next(newParking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AdminParkingService.prototype.updateParkingStation = function (parking) {
        var updateParkingRef = this.parkingStationsRef.child(parking.id);
        updateParkingRef.update({
            title: parking.title,
            address: parking.address,
            type: parking.type,
            lat: parking.lat,
            lng: parking.lng,
            size: parking.size,
            availableSpots: parking.availableSpots,
            availability: parking.availability,
            rate: parking.rate,
        });
    };
    AdminParkingService.prototype.addParkingStation = function (parking) {
        var newParking = this.parkingStationsRef.push();
        newParking.set({
            title: parking.title,
            address: parking.address,
            type: parking.type,
            lat: parking.lat,
            lng: parking.lng,
            size: parking.size,
            availableSpots: parking.availableSpots,
            availability: parking.availability,
            rate: parking.rate,
            id: newParking.key
        });
    };
    AdminParkingService.prototype.deleteParkingStation = function (parking) {
        var deleteThisRef = this.parkingStationsRef.child(parking.id);
        deleteThisRef.remove();
    };
    AdminParkingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], AdminParkingService);
    return AdminParkingService;
}());
exports.AdminParkingService = AdminParkingService;
//# sourceMappingURL=admin-parking.service.js.map