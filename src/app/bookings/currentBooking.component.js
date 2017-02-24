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
var booking_service_1 = require('../shared/services/booking.service');
var CurrentBookingComponent = (function () {
    function CurrentBookingComponent(bookingService) {
        this.bookingService = bookingService;
        this.currentBooking = undefined;
        this.subscriptions = [];
    }
    CurrentBookingComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subs = _a[_i];
            subs.unsubscribe();
        }
    };
    CurrentBookingComponent.prototype.ngOnInit = function () {
        this.getCurrentBooking();
    };
    CurrentBookingComponent.prototype.getCurrentBooking = function () {
        var _this = this;
        var temp = this.bookingService.getCurrentBooking()
            .subscribe(function (booking) {
            _this.currentBooking = booking;
            if (booking === undefined) {
            }
        }, function (err) {
            console.error("Unable to get current booking -", err);
        });
        this.subscriptions.push(temp);
    };
    CurrentBookingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'current-booking',
            templateUrl: 'currentBooking.component.html'
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService])
    ], CurrentBookingComponent);
    return CurrentBookingComponent;
}());
exports.CurrentBookingComponent = CurrentBookingComponent;
//# sourceMappingURL=currentBooking.component.js.map