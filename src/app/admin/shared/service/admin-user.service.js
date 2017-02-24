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
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var firebase_config_service_1 = require("../../../core/service/firebase-config.service");
var user_service_1 = require("../../../shared/services/user.service");
/**
 * Created by Isaiah on 2017-02-06.
 */
var AdminUserService = (function () {
    function AdminUserService(fire, userService) {
        this.fire = fire;
        this.userService = userService;
        this.databaseRef = this.fire.database;
        this.userRef = this.databaseRef.ref('/users');
    }
    AdminUserService.prototype.getAddedUsers = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.userRef.on('child_added', function (user) {
                var newUser = user.val();
                obs.next(newUser);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AdminUserService.prototype.getUpdatedUsers = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.userRef.on('child_changed', function (user) {
                var newUser = user.val();
                obs.next(newUser);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AdminUserService.prototype.getRemovedUsers = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.userRef.on('child_removed', function (user) {
                var newUser = user.val();
                obs.next(newUser);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AdminUserService.prototype.updateUser = function (user) {
        this.userService.updateUser(user);
    };
    AdminUserService.prototype.addUser = function (user, password) {
        //name: string, email: string, password: string
        this.userService.register(user.name, user.email, password);
        this.userService.addUser(user);
    };
    AdminUserService.prototype.deleteUser = function (user) {
        this.userRef.child(user.uid).remove();
        this.fire.auth.currentUser.delete();
    };
    AdminUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService, user_service_1.UserService])
    ], AdminUserService);
    return AdminUserService;
}());
exports.AdminUserService = AdminUserService;
//# sourceMappingURL=admin-user.service.js.map