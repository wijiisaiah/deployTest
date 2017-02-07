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
var user_1 = require('../model/user');
var Rx_1 = require("rxjs/Rx");
var router_1 = require("@angular/router");
var UserService = (function () {
    function UserService(fire, router) {
        this.fire = fire;
        this.router = router;
        this.authRef = this.fire.auth;
        this.databaseRef = this.fire.database.ref('/users');
        this.currentUser = this.fire.auth.currentUser;
        this.currentUser = this.fire.auth.currentUser;
    }
    UserService.prototype.register = function (name, email, password) {
        var that = this;
        var temp = new user_1.User(name, null, email, null, null);
        console.log(name, email, password);
        return this.authRef.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
            temp.uid = user.uid;
            that.addUser(temp);
            that.currentUser = user;
            console.log(user);
            this.router.navigate(['/map']);
        })
            .catch(function (err) {
            console.error("Registration Error", err);
        });
    };
    UserService.prototype.login = function (email, password) {
        var that = this;
        return this.authRef.signInWithEmailAndPassword(email, password)
            .then(function (user) {
            that.currentUser = user;
            console.log(that.currentUser);
            that.router.navigate(['/map']);
        })
            .catch(function (err) {
            console.error("Login Error", err);
        });
    };
    UserService.prototype.signOut = function () {
        this.authRef.signOut();
        this.currentUser = null;
        console.log('signed out');
        this.router.navigate(['/login']);
    };
    UserService.prototype.addUser = function (user) {
        var newUserRef = this.databaseRef.child(user.uid);
        newUserRef.set({
            name: user.name,
            uid: user.uid,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber
        })
            .catch(function (err) {
            console.error("Unable to add new user to Db -", err);
        });
    };
    UserService.prototype.updateUser = function (user) {
        var userRef = this.databaseRef.child(user.uid);
        userRef.update(user);
    };
    UserService.prototype.findUserRef = function (uid) {
        return this.databaseRef.child(uid);
    };
    UserService.prototype.getCurrentUser = function () {
        var _this = this;
        this.currentUser = this.fire.auth.currentUser;
        return Rx_1.Observable.create(function (obs) {
            var uid = _this.currentUser.uid;
            var currentUserRef = _this.databaseRef.child(uid);
            currentUserRef.on('value', function (user) {
                var newUser = user.val();
                obs.next(newUser);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    UserService.prototype.isAuthenticated = function () {
        var user = this.authRef.currentUser;
        if (user) {
            return true;
        }
        else {
            return false;
        }
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService, router_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map