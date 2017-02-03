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
var booking_1 = require('../../shared/model/booking');
var MyBookingsComponent = (function () {
    function MyBookingsComponent(bookingService) {
        this.bookingService = bookingService;
        this.currentBooking = new booking_1.Booking(null, null, null, null, null);
    }
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