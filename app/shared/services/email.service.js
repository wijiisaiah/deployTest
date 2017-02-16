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
var email_1 = require('../model/email');
var EmailService = (function () {
    function EmailService(fire) {
        this.fire = fire;
        this.databaseRef = this.fire.database.ref('/emails');
        var currentUser = this.fire.auth.currentUser;
        this.userEmail = currentUser.email;
    }
    EmailService.prototype.createEmail = function (emailType) {
        var _this = this;
        var email = new email_1.Email(null, null, null, null);
        var emailRef = this.databaseRef.child('email information').child('details').child(emailType);
        // return Observable.create(obs => {
        //     emailRef.on('value', emailInfo => {
        //         email = emailInfo.val() as Email;
        //         console.log('raw data', emailInfo);
        //         obs.next(email);
        //         console.log('obs next set', email);
        //     },
        //         err => {
        //             obs.throw(err);
        //         });
        // });
        return new Promise(function (fulfill) {
            emailRef.on('value', function (emailInfo) {
                email = emailInfo.val();
                console.log('raw data', emailInfo);
                console.log('obs next set', email);
                _this.sendEmail(email);
            });
        });
    };
    EmailService.prototype.sendEmail = function (email) {
        var newEmailRef = this.databaseRef.child('email to send').child('email');
        // const ref = newEmailRef.push();
        console.log('pushed to newEmailRef');
        newEmailRef.set({
            from: email.from,
            to: this.userEmail,
            subject: email.subject,
            body: email.body
        })
            .catch(function (err) { return console.error("Unable to add Booking", err); });
    };
    EmailService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map