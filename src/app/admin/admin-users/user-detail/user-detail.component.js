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
var admin_user_service_1 = require('../../shared/service/admin-user.service');
var forbidden_string_validator_1 = require('../../../shared/validation/forbidden-string.validator');
var user_1 = require("../../../shared/model/user");
var AdminUserDetailComponent = (function () {
    function AdminUserDetailComponent(formB, aus) {
        this.formB = formB;
        this.aus = aus;
        this.modalId = "bugModal";
        this.currentUser = new user_1.User(null, null, null, null, null, null, null);
    }
    AdminUserDetailComponent.prototype.ngOnInit = function () {
        this.configureForm();
    };
    AdminUserDetailComponent.prototype.configureForm = function (user) {
        // this.bugForm = new FormGroup({
        //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     status: new FormControl(this.currentBug.status, Validators.required),
        //     severity: new FormControl(this.currentBug.severity, Validators.required),
        //     description: new FormControl(this.currentBug.description, Validators.required)
        // });
        if (user) {
            this.currentUser = new user_1.User(user.name, user.uid, user.email, user.address, user.phoneNumber, user.currentBooking, user.pastBookings);
        }
        this.userForm = this.formB.group({
            name: [this.currentUser.name, [forms_1.Validators.required, forbidden_string_validator_1.forbiddenStringValidator(/puppy/i)]],
            uid: [this.currentUser.uid, forms_1.Validators.required],
            email: [this.currentUser.email, forms_1.Validators.required],
            address: [this.currentUser.address, forms_1.Validators.required],
            phoneNumber: [this.currentUser.phoneNumber, forms_1.Validators.required],
            currentBooking: [this.currentUser.currentBooking, forms_1.Validators.required],
            pastBookings: [this.currentUser.pastBookings, forms_1.Validators.required],
        });
    };
    AdminUserDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-detail',
            templateUrl: 'user-detail.component.html',
            styleUrls: ['user-detail.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, admin_user_service_1.AdminUserService])
    ], AdminUserDetailComponent);
    return AdminUserDetailComponent;
}());
exports.AdminUserDetailComponent = AdminUserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map