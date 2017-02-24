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
var admin_user_service_1 = require('../../shared/service/admin-user.service');
var AdminUserListComponent = (function () {
    function AdminUserListComponent(aus) {
        this.aus = aus;
        this.users = [];
    }
    AdminUserListComponent.prototype.ngOnInit = function () {
        this.getAddedUsers();
        this.getUpdatedUsers();
    };
    AdminUserListComponent.prototype.getAddedUsers = function () {
        var _this = this;
        this.aus.getAddedUsers()
            .subscribe(function (user) {
            _this.users.push(user);
        }, function (err) {
            console.error("Unable to get added user - ", err);
        });
    };
    AdminUserListComponent.prototype.getUpdatedUsers = function () {
        var _this = this;
        this.aus.getUpdatedUsers()
            .subscribe(function (updatedUser) {
            var userIndex = _this.users.map(function (index) { return index.uid; }).indexOf(updatedUser['uid']);
            _this.users[userIndex] = updatedUser;
        }, function (err) {
            console.log("Unable to get updated user - ", err);
        });
    };
    AdminUserListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-list',
            templateUrl: 'user-list.component.html',
            styleUrls: ['user-list.component.css']
        }), 
        __metadata('design:paramtypes', [admin_user_service_1.AdminUserService])
    ], AdminUserListComponent);
    return AdminUserListComponent;
}());
exports.AdminUserListComponent = AdminUserListComponent;
//# sourceMappingURL=user-list.component.js.map