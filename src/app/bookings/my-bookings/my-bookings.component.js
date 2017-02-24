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
        this.subscriptions = [];
    }
    MyBookingsComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subs = _a[_i];
            subs.unsubscribe();
        }
    };
    MyBookingsComponent.prototype.ngOnInit = function () {
        this.getAddedBookings();
    };
    MyBookingsComponent.prototype.open = function (index) {
        for (var each in document.getElementsByClassName('accordion-toggle')) {
            $(each).toggleClass('active').removeClass('active');
        }
        console.log(index);
        var temp = document.getElementsByClassName('accordion-toggle').item(index);
        $(temp).next().slideToggle('600');
        $(".accordion-content").not($(temp).next()).slideUp('600');
    };
    MyBookingsComponent.prototype.getAddedBookings = function () {
        var _this = this;
        var temp = this.bookingService.getAddedBookings()
            .subscribe(function (booking) {
            _this.bookings.unshift(booking);
        }, function (err) {
            console.error("Unable to get added booking - ", err);
        });
        this.subscriptions.push(temp);
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