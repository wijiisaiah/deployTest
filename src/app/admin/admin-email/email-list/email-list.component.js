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
var admin_email_service_1 = require('../../shared/service/admin-email.service');
var AdminEmailListComponent = (function () {
    function AdminEmailListComponent(aes) {
        this.aes = aes;
        this.emails = [];
    }
    AdminEmailListComponent.prototype.ngOnInit = function () {
        this.getAddedEmails();
        this.getUpdatedEmails();
    };
    AdminEmailListComponent.prototype.getAddedEmails = function () {
        var _this = this;
        this.aes.getAddedEmails()
            .subscribe(function (email) {
            _this.emails.push(email);
        }, function (err) {
            console.error("Unable to get added email - ", err);
        });
    };
    AdminEmailListComponent.prototype.getUpdatedEmails = function () {
        var _this = this;
        this.aes.getUpdatedEmails()
            .subscribe(function (updatedEmail) {
            var newEmail = updatedEmail;
            var emailIndex = _this.emails.map(function (index) { return index.type; }).indexOf(updatedEmail['type']);
            _this.emails[emailIndex] = newEmail;
        }, function (err) {
            console.log("Unable to get updated email - ", err);
        });
    };
    AdminEmailListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'email-list',
            templateUrl: 'email-list.component.html',
            styleUrls: ['email-list.component.css']
        }), 
        __metadata('design:paramtypes', [admin_email_service_1.AdminEmailService])
    ], AdminEmailListComponent);
    return AdminEmailListComponent;
}());
exports.AdminEmailListComponent = AdminEmailListComponent;
//# sourceMappingURL=email-list.component.js.map