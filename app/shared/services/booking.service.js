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
var core_1 = require('@angular/core');
var firebase_config_service_1 = require('../../core/service/firebase-config.service');
var user_service_1 = require("./user.service");
var booking_1 = require("../model/booking");
var Time_1 = require("../util/Time");
var BookingService = (function () {
    function BookingService(fire, us) {
        this.fire = fire;
        this.us = us;
        this.databaseRef = this.fire.database.ref('/users');
        var curUser = this.fire.auth.currentUser;
        this.currentUserRef = this.databaseRef.child(curUser.uid);
    }
    BookingService.prototype.createBooking = function (parkingStation) {
        var t = new Time_1.Time();
        var date = t.getCurrentDate();
        var startTime = t.getCurrentTime();
        var newBooking = new booking_1.Booking(parkingStation, date, startTime);
        this.currentUserRef.child('bookings').push(newBooking);
    };
    BookingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService, user_service_1.UserService])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map