import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AdminParkingService } from '../../shared/service/admin-parking.service';

import { forbiddenStringValidator } from '../../../shared/validation/forbidden-string.validator';
import {ParkingStation} from "../../../shared/model/parkingStation";

@Component({
    moduleId: module.id,
    selector: 'parking-detail',
    templateUrl: 'parking-detail.component.html',
    styleUrls: ['parking-detail.component.css']
})
export class AdminParkingDetailComponent implements OnInit {
    private modalId = "parkingModal";
    private parkingForm: FormGroup;
    private currentParkingStation = new ParkingStation(null, null, null, null, null, null, null, null, null, null);
    constructor(private formB: FormBuilder, private aps: AdminParkingService) { }

    ngOnInit() {
        this.configureForm();
    }

    configureForm(parkingStation?: ParkingStation) {

        if (parkingStation) {
            this.currentParkingStation = new ParkingStation(
                parkingStation.title,
                parkingStation.address,
                parkingStation.type,
                parkingStation.lat,
                parkingStation.lng,
                parkingStation.size,
                parkingStation.availableSpots,
                parkingStation.availability,
                parkingStation.rate,
                parkingStation.id
            );
        }

        this.parkingForm = this.formB.group({
            title: [this.currentParkingStation.title, [Validators.required]],
            address: [this.currentParkingStation.address, Validators.required],
            type: [this.currentParkingStation.type, Validators.required],
            lat: [this.currentParkingStation.lat, Validators.required],
            lng: [this.currentParkingStation.lng, Validators.required],
            size: [this.currentParkingStation.size, Validators.required],
            availableSpots: [this.currentParkingStation.availableSpots, Validators.required],
            availability: [this.currentParkingStation.availability, Validators.required],
            rate: [this.currentParkingStation.rate, Validators.required],
            id: [this.currentParkingStation.id]

        });
    }

    submitForm() {
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
        } else {
            this.addParkingStation();
        }
    }

    deleteParkingStation() {
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
    }

    addParkingStation() {
        this.aps.addParkingStation(this.currentParkingStation);
    }

    updateParkingStation() {
        this.aps.updateParkingStation(this.currentParkingStation);
    }

    freshForm() {
        this.parkingForm.reset({ });
        this.cleanBug();
    }

    cleanBug() {
        this.currentParkingStation = new ParkingStation(null, null, null, null, null, null, null, null, null, null);
    }

}
