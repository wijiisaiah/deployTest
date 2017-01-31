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
var user_authentication_service_1 = require('../services/user-authentication.service');
var user_1 = require('../model/user');
var UserAuthenticationComponent = (function () {
    function UserAuthenticationComponent(UserAuthenticationService) {
        this.UserAuthenticationService = UserAuthenticationService;
        this.currentUser = new user_1.User(null, null, null, null);
    }
    UserAuthenticationComponent.prototype.register = function () {
        var name = "Manolis";
        var email = "manioannides@gmail.com";
        var password = "password";
        this.UserAuthenticationService.register(email, password);
        console.log("User Registered");
        this.currentUser.email = email;
        this.currentUser.name = name;
        this.UserAuthenticationService.addUser(this.currentUser);
    };
    UserAuthenticationComponent.prototype.login = function () {
        var email = "manolis@alumni.ubc.ca";
        var password = "password";
        this.UserAuthenticationService.login(email, password);
        console.log("User Authenticated");
    };
    UserAuthenticationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-authentication',
            templateUrl: 'user-authentication.component.html',
            styleUrls: ['user-authentication.component.css']
        }), 
        __metadata('design:paramtypes', [user_authentication_service_1.UserAuthenticationService])
    ], UserAuthenticationComponent);
    return UserAuthenticationComponent;
}());
exports.UserAuthenticationComponent = UserAuthenticationComponent;
//# sourceMappingURL=user-authentication.component.js.map