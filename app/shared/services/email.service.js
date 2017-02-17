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
var user_service_1 = require("./user.service");
var firebase_config_service_1 = require('../../core/service/firebase-config.service');
var email_1 = require('../model/email');
var EmailService = (function () {
    function EmailService(userService, fire) {
        this.userService = userService;
        this.fire = fire;
        this.databaseRef = this.fire.database.ref('/emails');
        this.currentUserRef = this.fire.database.ref('/users');
        var currentUser = this.fire.auth.currentUser;
    }
    EmailService.prototype.getUser = function () {
        var _this = this;
        this.userService.getCurrentUser()
            .subscribe(function (user) {
            if (user) {
                _this.userEmail = user.email;
            }
        });
    };
    EmailService.prototype.createEmail = function (emailType, userEmail) {
        var _this = this;
        this.userEmail = this.fire.auth.currentUser.email;
        if (this.userEmail || userEmail) {
            if (userEmail) {
                this.userEmail = userEmail;
            }
            var email_2 = new email_1.Email(null, null, null, null);
            var emailRef_1 = this.databaseRef.child('email information').child('details').child(emailType);
            return new Promise(function (fulfill) {
                emailRef_1.on('value', function (emailInfo) {
                    email_2 = emailInfo.val();
                    _this.sendEmail(email_2, userEmail);
                });
            });
        }
        else {
            console.error('User email is undefined');
        }
    };
    EmailService.prototype.sendEmail = function (email, userEmail) {
        if (userEmail) {
            this.userEmail = userEmail;
        }
        var newEmailRef = this.databaseRef.child('email to send').child('email');
        // const ref = newEmailRef.push();
        newEmailRef.set({
            from: email.from,
            to: this.userEmail,
            subject: email.subject,
            body: email.body
        })
            .catch(function (err) { return console.error("Unable to send Email", err); });
    };
    EmailService.BOOKING_CONFIRMATION = 'booking confirmation';
    EmailService.BOOKING_CANCELLATION = 'booking cancellation';
    EmailService.BOOKING_COMPLETION = 'booking completion';
    EmailService.REGISTRATION_CONFIRMATION = 'registration confirmation';
    EmailService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, firebase_config_service_1.FirebaseConfigService])
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map