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
var bug_service_1 = require('../service/bug.service');
var forbidden_string_validator_1 = require('../../../shared/validation/forbidden-string.validator');
var parkingStation_1 = require("../../../shared/model/parkingStation");
var BugDetailComponent = (function () {
    function BugDetailComponent(formB, BugService) {
        this.formB = formB;
        this.BugService = BugService;
        this.modalId = "bugModal";
        this.currentParkingStation = new parkingStation_1.ParkingStation(null, null, null, null, null, null, null, null, null);
    }
    BugDetailComponent.prototype.ngOnInit = function () {
        this.configureForm();
    };
    BugDetailComponent.prototype.configureForm = function (parkingStation) {
        // this.bugForm = new FormGroup({
        //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     status: new FormControl(this.currentBug.status, Validators.required),
        //     severity: new FormControl(this.currentBug.severity, Validators.required),
        //     description: new FormControl(this.currentBug.description, Validators.required)
        // });
        if (parkingStation) {
            this.currentParkingStation = new parkingStation_1.ParkingStation(parkingStation.title, parkingStation.address, parkingStation.type, parkingStation.lat, parkingStation.lng, parkingStation.size, parkingStation.availableSpots, parkingStation.availability, parkingStation.rate);
        }
        this.parkingForm = this.formB.group({
            title: [this.currentParkingStation.title, [forms_1.Validators.required, forbidden_string_validator_1.forbiddenStringValidator(/puppy/i)]],
            address: [this.currentParkingStation.address, forms_1.Validators.required],
            type: [this.currentParkingStation.type, forms_1.Validators.required],
            lat: [this.currentParkingStation.lat, forms_1.Validators.required],
            lng: [this.currentParkingStation.lng, forms_1.Validators.required],
            size: [this.currentParkingStation.size, forms_1.Validators.required],
            availableSpots: [this.currentParkingStation.availableSpots, forms_1.Validators.required],
            availability: [this.currentParkingStation.availability, forms_1.Validators.required],
            rate: [this.currentParkingStation.rate, forms_1.Validators.required]
        });
    };
    BugDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bug-detail',
            templateUrl: 'bug-detail.component.html',
            styleUrls: ['bug-detail.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, bug_service_1.BugService])
    ], BugDetailComponent);
    return BugDetailComponent;
}());
exports.BugDetailComponent = BugDetailComponent;
//# sourceMappingURL=bug-detail.component.js.map