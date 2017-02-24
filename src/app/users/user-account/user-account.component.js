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
var user_service_1 = require('../../shared/services/user.service');
var user_1 = require('../../shared/model/user');
var UserAccountComponent = (function () {
    function UserAccountComponent(uas) {
        this.uas = uas;
        this.currentUser = new user_1.User(null, null, null, null, null);
        this.subscriptions = [];
    }
    UserAccountComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subs = _a[_i];
            subs.unsubscribe();
        }
    };
    UserAccountComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
        $('#account-link').click(function (e) {
            $("#account-form").delay(100).fadeIn(100);
            $("#security-form").fadeOut(100);
            $('#security-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#security-link').click(function (e) {
            $("#security-form").delay(100).fadeIn(100);
            $("#account-form").fadeOut(100);
            $('#account-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
    };
    UserAccountComponent.prototype.getCurrentUser = function () {
        var _this = this;
        var temp = this.uas.getCurrentUser()
            .subscribe(function (user) {
            _this.currentUser = user;
            // console.log("Current user - ", this.currentUser);
        }, function (err) {
            console.error("Unable to get current user -", err);
        });
        this.subscriptions.push(temp);
    };
    UserAccountComponent.prototype.editInfo = function () {
        console.log("Editediteditediteditediteditediteditediteditedit");
        document.getElementById('argName').readOnly = false;
        document.getElementById('argEmail').readOnly = false;
        document.getElementById('argAddress').readOnly = false;
        document.getElementById('updateButton').hidden = false;
        document.getElementById('editButton').hidden = true;
    };
    UserAccountComponent.prototype.updateUser = function () {
        this.currentUser.name = document.getElementById('argName').value;
        this.currentUser.email = document.getElementById('argEmail').value;
        this.currentUser.address = document.getElementById('argAddress').value;
        this.uas.updateUser(this.currentUser);
        document.getElementById('argName').readOnly = true;
        document.getElementById('argEmail').readOnly = true;
        document.getElementById('argAddress').readOnly = true;
        document.getElementById('updateButton').hidden = true;
        document.getElementById('editButton').hidden = false;
    };
    UserAccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-account',
            templateUrl: 'user-account.component.html',
            styleUrls: ['user-account.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserAccountComponent);
    return UserAccountComponent;
}());
exports.UserAccountComponent = UserAccountComponent;
//# sourceMappingURL=user-account.component.js.map