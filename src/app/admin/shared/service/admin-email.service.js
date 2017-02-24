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
var AdminEmailService = (function () {
    function AdminEmailService(fire) {
        this.fire = fire;
        this.databaseRef = this.fire.database;
        this.emailRef = this.databaseRef.ref('/emails/email information/details');
    }
    AdminEmailService.prototype.getAddedEmails = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.emailRef.on('child_added', function (email) {
                var newEmail = email.val();
                obs.next(newEmail);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AdminEmailService.prototype.getUpdatedEmails = function () {
        var _this = this;
        return Rx_1.Observable.create(function (obs) {
            _this.emailRef.on('child_changed', function (email) {
                var newEmail = email.val();
                newEmail.type = email.key;
                obs.next(newEmail);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    AdminEmailService.prototype.updateEmail = function (email) {
        var updateEmailRef = this.emailRef.child(email.type);
        updateEmailRef.update({
            from: email.from,
            subject: email.subject,
            body: email.body,
            type: email.type
        });
    };
    AdminEmailService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], AdminEmailService);
    return AdminEmailService;
}());
exports.AdminEmailService = AdminEmailService;
//# sourceMappingURL=admin-email.service.js.map