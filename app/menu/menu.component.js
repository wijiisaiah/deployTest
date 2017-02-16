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
/**
 * Created by Isaiah on 2017-01-31.
 */
var core_1 = require('@angular/core');
var user_service_1 = require("../shared/services/user.service");
var user_1 = require("../shared/model/user");
var booking_service_1 = require("../shared/services/booking.service");
var router_1 = require("@angular/router");
var menu_service_1 = require("../shared/services/menu.service");
var MenuComponent = (function () {
    function MenuComponent(uas, BookingService, router, menuService) {
        this.uas = uas;
        this.BookingService = BookingService;
        this.router = router;
        this.menuService = menuService;
        this.currentUser = new user_1.User(null, null, null, null, null);
        this.currentBooking = null;
        this.userAccountHidden = true;
        this.userBookingsHidden = true;
        this.userMenuHidden = false;
        this.subscriptions = [];
    }
    MenuComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subs = _a[_i];
            subs.unsubscribe();
        }
        console.log('Menu Destroyed');
    };
    MenuComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
        this.getCurrentBooking();
        this.menuService.isOpen = false;
    };
    /* Close when someone clicks on the "x" symbol inside the overlay */
    MenuComponent.prototype.signOut = function () {
        this.uas.signOut();
    };
    MenuComponent.prototype.getCurrentBooking = function () {
        var _this = this;
        var temp = this.BookingService.getCurrentBooking()
            .subscribe(function (booking) {
            _this.currentBooking = booking;
        }, function (err) {
            console.error("Unable to get current user -", err);
        });
        this.subscriptions.push(temp);
    };
    MenuComponent.prototype.getCurrentUser = function () {
        var _this = this;
        var temp = this.uas.getCurrentUser()
            .subscribe(function (user) {
            _this.currentUser = user;
        }, function (err) {
            console.error("Unable to get current user -", err);
        });
        this.subscriptions.push(temp);
    };
    MenuComponent.prototype.replaceMenuContent = function (replaceThis, withThis) {
        switch (replaceThis) {
            case 'menu': {
                this.userMenuHidden = true;
                switch (withThis) {
                    case 'account':
                        {
                            this.userAccountHidden = false;
                            this.menuService.changeMenu(50);
                        }
                        return;
                    case 'booking': {
                        this.menuService.changeMenu(75);
                        this.userBookingsHidden = false;
                        console.log("call update here");
                    }
                }
                return;
            }
            default: {
                this.menuService.changeMenu(25);
                this.userAccountHidden = true;
                this.userBookingsHidden = true;
                this.userMenuHidden = false;
            }
        }
    };
    MenuComponent.prototype.reRoute = function () {
        this.router.navigate(['/login']);
    };
    MenuComponent.prototype.changeMenu = function () {
        this.menuService.changeMenu();
    };
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-menu',
            templateUrl: 'menu.component.html',
            styleUrls: ['menu.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, booking_service_1.BookingService, router_1.Router, menu_service_1.MenuService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map