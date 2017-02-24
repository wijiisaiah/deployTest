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
var admin_parking_service_1 = require('../../shared/service/admin-parking.service');
var parkingStation_1 = require("../../../shared/model/parkingStation");
var AdminParkingDetailComponent = (function () {
    function AdminParkingDetailComponent(formB, aps) {
        this.formB = formB;
        this.aps = aps;
        this.modalId = "parkingModal";
        this.currentParkingStation = new parkingStation_1.ParkingStation(null, null, null, null, null, null, null, null, null, null);
    }
    AdminParkingDetailComponent.prototype.ngOnInit = function () {
        this.configureForm();
    };
    AdminParkingDetailComponent.prototype.configureForm = function (parkingStation) {
        if (parkingStation) {
            this.currentParkingStation = new parkingStation_1.ParkingStation(parkingStation.title, parkingStation.address, parkingStation.type, parkingStation.lat, parkingStation.lng, parkingStation.size, parkingStation.availableSpots, parkingStation.availability, parkingStation.rate, parkingStation.id);
        }
        this.parkingForm = this.formB.group({
            title: [this.currentParkingStation.title, [forms_1.Validators.required]],
            address: [this.currentParkingStation.address, forms_1.Validators.required],
            type: [this.currentParkingStation.type, forms_1.Validators.required],
            lat: [this.currentParkingStation.lat, forms_1.Validators.required],
            lng: [this.currentParkingStation.lng, forms_1.Validators.required],
            size: [this.currentParkingStation.size, forms_1.Validators.required],
            availableSpots: [this.currentParkingStation.availableSpots, forms_1.Validators.required],
            availability: [this.currentParkingStation.availability, forms_1.Validators.required],
            rate: [this.currentParkingStation.rate, forms_1.Validators.required],
            id: [this.currentParkingStation.id]
        });
    };
    AdminParkingDetailComponent.prototype.submitForm = function () {
        this.currentParkingStation.title = this.parkingForm.value["title"];
        this.currentParkingStation.address = this.parkingForm.value["address"];
        this.currentParkingStation.type = this.parkingForm.value["type"];
        this.currentParkingStation.lat = this.parkingForm.value["lat"];
        this.currentParkingStation.lng = this.parkingForm.value["lng"];
        this.currentParkingStation.size = this.parkingForm.value["size"];
        this.currentParkingStation.availableSpots = this.parkingForm.value["availableSpots"];
        this.currentParkingStation.availability = this.parkingForm.value["availability"];
        this.currentParkingStation.rate = this.parkingForm.value["rate"];
        if (this.currentParkingStation.id) {
            this.updateParkingStation();
        }
        else {
            this.addParkingStation();
        }
    };
    AdminParkingDetailComponent.prototype.deleteParkingStation = function () {
        this.currentParkingStation.title = this.parkingForm.value["title"];
        this.currentParkingStation.address = this.parkingForm.value["address"];
        this.currentParkingStation.type = this.parkingForm.value["type"];
        this.currentParkingStation.lat = this.parkingForm.value["lat"];
        this.currentParkingStation.lng = this.parkingForm.value["lng"];
        this.currentParkingStation.size = this.parkingForm.value["size"];
        this.currentParkingStation.availableSpots = this.parkingForm.value["availableSpots"];
        this.currentParkingStation.availability = this.parkingForm.value["availability"];
        this.currentParkingStation.rate = this.parkingForm.value["rate"];
        this.currentParkingStation.id = this.parkingForm.value["id"];
        this.aps.deleteParkingStation(this.currentParkingStation);
    };
    AdminParkingDetailComponent.prototype.addParkingStation = function () {
        this.aps.addParkingStation(this.currentParkingStation);
    };
    AdminParkingDetailComponent.prototype.updateParkingStation = function () {
        this.aps.updateParkingStation(this.currentParkingStation);
    };
    AdminParkingDetailComponent.prototype.freshForm = function () {
        this.parkingForm.reset({});
        this.cleanBug();
    };
    AdminParkingDetailComponent.prototype.cleanBug = function () {
        this.currentParkingStation = new parkingStation_1.ParkingStation(null, null, null, null, null, null, null, null, null, null);
    };
    AdminParkingDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'parking-detail',
            templateUrl: 'parking-detail.component.html',
            styleUrls: ['parking-detail.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, admin_parking_service_1.AdminParkingService])
    ], AdminParkingDetailComponent);
    return AdminParkingDetailComponent;
}());
exports.AdminParkingDetailComponent = AdminParkingDetailComponent;
//# sourceMappingURL=parking-detail.component.js.map