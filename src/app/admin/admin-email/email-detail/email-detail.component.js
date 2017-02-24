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
var forms_1 = require('@angular/forms');
var admin_email_service_1 = require('../../shared/service/admin-email.service');
var email_1 = require('../../../shared/model/email');
var email_service_1 = require("../../../shared/services/email.service");
var AdminEmailDetailComponent = (function () {
    function AdminEmailDetailComponent(formB, aes) {
        this.formB = formB;
        this.aes = aes;
        this.modalId = "emailModal";
        this.currentEmail = new email_1.Email(null, null, null, null, null);
        this.typeArr = [
            email_service_1.EmailService.BOOKING_CANCELLATION, email_service_1.EmailService.BOOKING_COMPLETION,
            email_service_1.EmailService.BOOKING_CONFIRMATION, email_service_1.EmailService.REGISTRATION_CONFIRMATION
        ];
    }
    AdminEmailDetailComponent.prototype.ngOnInit = function () {
        this.configureForm();
    };
    AdminEmailDetailComponent.prototype.configureForm = function (email) {
        if (email) {
            this.currentEmail = new email_1.Email(email.from, email.subject, null, email.body, email.type);
        }
        console.log(this.currentEmail);
        console.log(this.typeArr);
        this.emailForm = this.formB.group({
            type: [this.currentEmail.type],
            from: [this.currentEmail.from],
            subject: [this.currentEmail.subject],
            body: [this.currentEmail.body]
        });
    };
    AdminEmailDetailComponent.prototype.submitForm = function () {
        this.currentEmail.type = this.emailForm.value["type"];
        this.currentEmail.from = this.emailForm.value["from"];
        this.currentEmail.subject = this.emailForm.value["subject"];
        this.currentEmail.body = this.emailForm.value["body"];
        this.updateEmail();
    };
    AdminEmailDetailComponent.prototype.updateEmail = function () {
        this.aes.updateEmail(this.currentEmail);
    };
    AdminEmailDetailComponent.prototype.freshForm = function () {
        this.emailForm.reset({});
        this.cleanBug();
    };
    AdminEmailDetailComponent.prototype.cleanBug = function () {
        this.currentEmail = new email_1.Email(null, null, null, null);
    };
    AdminEmailDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'email-detail',
            templateUrl: 'email-detail.component.html',
            styleUrls: ['email-detail.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, admin_email_service_1.AdminEmailService])
    ], AdminEmailDetailComponent);
    return AdminEmailDetailComponent;
}());
exports.AdminEmailDetailComponent = AdminEmailDetailComponent;
//# sourceMappingURL=email-detail.component.js.map