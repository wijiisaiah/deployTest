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
var UserAuthenticationService = (function () {
    function UserAuthenticationService(fire) {
        this.fire = fire;
        this.authRef = this.fire.auth;
        this.databaseRef = this.fire.database.ref('/users');
        this.currentUser = this.fire.auth.currentUser;
    }
    UserAuthenticationService.prototype.register = function (name, email, password) {
        var that = this;
        this.authRef.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
            user.updateProfile({
                displayName: name,
                photoURL: ""
            });
            console.log(user);
        })
            .catch(function (err) {
            console.error("Registration Error", err);
        });
    };
    UserAuthenticationService.prototype.login = function (email, password) {
        var that = this;
        this.authRef.signInWithEmailAndPassword(email, password)
            .then(function (user) {
            that.currentUser = user;
            console.log(that.currentUser);
        })
            .catch(function (err) {
            console.error("Login Error", err);
        });
    };
    UserAuthenticationService.prototype.addUser = function (user) {
        var newUserRef = this.databaseRef.push();
        newUserRef.set({
            name: user.name,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber
        })
            .catch(function (err) {
            console.error("Unable to add new user to Db -", err);
        });
    };
    UserAuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], UserAuthenticationService);
    return UserAuthenticationService;
}());
exports.UserAuthenticationService = UserAuthenticationService;
//# sourceMappingURL=user-authentication.service.js.map