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
var MenuComponent = (function () {
    function MenuComponent(uas, BookingService) {
        this.uas = uas;
        this.BookingService = BookingService;
        this.currentUser = new user_1.User(null, null, null, null, null);
        this.userAccountHidden = true;
        this.userBookingsHidden = true;
        this.userMenuHidden = false;
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
    };
    /* Close when someone clicks on the "x" symbol inside the overlay */
    MenuComponent.prototype.closeNav = function () {
        document.getElementById("myNav").style.width = "0%";
    };
    MenuComponent.prototype.openNav = function () {
        document.getElementById("myNav").style.width = "75%";
    };
    MenuComponent.prototype.signOut = function () {
        this.uas.signOut();
    };
    MenuComponent.prototype.getCurrentUser = function () {
        var _this = this;
        this.uas.getCurrentUser()
            .subscribe(function (user) {
            _this.currentUser = user;
            console.log("Current user - ", _this.currentUser);
        }, function (err) {
            console.error("Unable to get current user -", err);
        });
    };
    MenuComponent.prototype.replaceMenuContent = function (replaceThis, withThis) {
        switch (replaceThis) {
            case 'menu': {
                this.userMenuHidden = true;
                switch (withThis) {
                    case 'account':
                        this.userAccountHidden = false;
                        return;
                    case 'booking': {
                        this.userBookingsHidden = false;
                        console.log("call update here");
                    }
                }
                return;
            }
            default: {
                this.userAccountHidden = true;
                this.userBookingsHidden = true;
                this.userMenuHidden = false;
            }
        }
    };
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-menu',
            templateUrl: 'menu.component.html',
            styleUrls: ['menu.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, booking_service_1.BookingService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map