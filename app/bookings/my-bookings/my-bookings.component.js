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
var booking_service_1 = require('../../shared/services/booking.service');
var MyBookingsComponent = (function () {
    function MyBookingsComponent(bookingService) {
        this.bookingService = bookingService;
        this.bookings = [];
        this.bookingObject = {};
        this.bookingObject['title'] = '';
        this.bookingObject['address'] = '';
        this.bookingObject['rate'] = '';
        this.bookingObject['date'] = '';
        this.bookingObject['startTime'] = '';
    }
    MyBookingsComponent.prototype.ngOnInit = function () {
        this.getAddedBookings();
        this.getCurrentBooking();
    };
    MyBookingsComponent.prototype.getAddedBookings = function () {
        var _this = this;
        this.bookingService.getAddedBookings()
            .subscribe(function (booking) {
            _this.bookings.push(booking);
        }, function (err) {
            console.error("Unable to get added booking - ", err);
        });
    };
    MyBookingsComponent.prototype.getCurrentBooking = function () {
        var _this = this;
        this.bookingService.getCurrentBooking()
            .subscribe(function (booking) {
            console.log('Before assigning', _this.bookingObject);
            console.log(booking);
            _this.bookingObject['title'] = booking.parkingStation.title;
            _this.bookingObject['address'] = booking.parkingStation.address;
            _this.bookingObject['rate'] = booking.parkingStation.rate;
            _this.bookingObject['date'] = booking.date;
            _this.bookingObject['startTime'] = booking.startTime;
            console.log(_this.bookingObject);
        }, function (err) {
            console.error("Unable to get current booking -", err);
        });
    };
    MyBookingsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-bookings',
            templateUrl: 'my-bookings.component.html',
            styleUrls: ['my-bookings.component.css']
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService])
    ], MyBookingsComponent);
    return MyBookingsComponent;
}());
exports.MyBookingsComponent = MyBookingsComponent;
//# sourceMappingURL=my-bookings.component.js.map