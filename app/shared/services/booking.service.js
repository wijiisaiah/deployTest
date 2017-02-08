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
var Observable_1 = require("rxjs/Observable");
var parkingStation_service_1 = require("./parkingStation.service");
var BookingService = (function () {
    function BookingService(fire, us, parkingService) {
        this.fire = fire;
        this.us = us;
        this.parkingService = parkingService;
        this.databaseRef = this.fire.database.ref('/users');
        var curUser = this.fire.auth.currentUser;
        this.currentUserRef = this.databaseRef.child(curUser.uid);
    }
    /* Listens for bookings added to user -> bookings in the database
    * Returns an Observable with the newly added booking
    */
    BookingService.prototype.getAddedBookings = function () {
        var bookingsRef = this.currentUserRef.child('bookings');
        return Observable_1.Observable.create(function (obs) {
            bookingsRef.on('child_added', function (booking) {
                var newBooking = booking.val();
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    /* Creates a new booking in user -> current booking in the database. It sets
    * the bookings start time, date and parking station.
    */
    BookingService.prototype.createBooking = function (parkingStation) {
        var date = Time_1.Time.getCurrentDate();
        var startTime = Time_1.Time.getCurrentTime();
        var startTimeMs = new Date().getTime();
        var newBooking = new booking_1.Booking(parkingStation, date, startTime, startTimeMs);
        var currentBookingRef = this.currentUserRef.child('current booking').child('curBooking');
        this.parkingService.decrementAvailability(newBooking);
        currentBookingRef.set({
            ParkingStation: parkingStation,
            date: date,
            startTime: startTime,
            startTimeMs: startTimeMs
        })
            .catch(function (err) { return console.error("Unable to add Booking", err); });
    };
    /* Listens for bookings added to user -> current booking in the database
    * Returns an Observable with the newly added current booking
    */
    BookingService.prototype.getCurrentBooking = function () {
        var bookingsRef = this.currentUserRef.child('current booking');
        return Observable_1.Observable.create(function (obs) {
            bookingsRef.on('child_added', function (booking) {
                var parkingStation = booking.child('ParkingStation').val();
                var curBooking = booking.val();
                curBooking.parkingStation = parkingStation;
                obs.next(curBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    /* Sets the end time and cost of the argument booking */
    BookingService.prototype.updateCurrentBooking = function (curBooking) {
        var endTime = Time_1.Time.getCurrentTime();
        var cost = this.calculateCost(curBooking);
        curBooking.endTime = endTime;
        curBooking.cost = cost;
    };
    /* Takes a booking as an argument and adds it to the database
    *  under user -> bookings.
    */
    BookingService.prototype.addBooking = function (booking) {
        var bookingsRef = this.currentUserRef.child('bookings');
        console.log("bookingsRef created");
        var ref = bookingsRef.push();
        console.log("Pushed to bookingsRef");
        this.parkingService.incrementAvailability(booking);
        ref.set({
            title: booking.parkingStation.title,
            address: booking.parkingStation.address,
            rate: booking.parkingStation.rate,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            cost: booking.cost
        })
            .catch(function (err) { return console.error("Unable to add Booking", err); });
    };
    /*
    * Deletes the current booking from the database under user -> current booking.
    */
    BookingService.prototype.removeCurrentBooking = function () {
        var currentBookingRef = this.currentUserRef.child('current booking');
        currentBookingRef.ref.remove();
        console.log("Removed");
    };
    BookingService.prototype.calculateCost = function (booking) {
        var endTime = new Date().getTime();
        var startTime = booking.startTimeMs;
        var durationMs = endTime - startTime;
        var durationHrs = durationMs / (3600 * 1000);
        var cost = (durationHrs * booking.parkingStation.rate).toFixed(3);
        console.log("Cost: " + cost + " Rate: " + booking.parkingStation.rate + " Duration: " + durationHrs);
        return cost;
    };
    BookingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService, user_service_1.UserService, parkingStation_service_1.ParkingService])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map