import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AdminParkingService } from './../../shared/service/admin-parking.service';

import { forbiddenStringValidator } from '../../../shared/validation/forbidden-string.validator';
import {ParkingStation} from "../../../shared/model/parkingStation";

@Component({
    moduleId: module.id,
    selector: 'parking-detail',
    templateUrl: 'parking-detail.component.html',
    styleUrls: ['parking-detail.component.css']
})
export class AdminParkingDetailComponent implements OnInit {
    private modalId = "bugModal";
    private parkingForm: FormGroup;
    private currentParkingStation = new ParkingStation(null, null, null, null, null, null, null, null, null);
    constructor(private formB: FormBuilder, private aps: AdminParkingService) { }

    ngOnInit() {
        this.configureForm();
    }

    configureForm(parkingStation?: ParkingStation) {
        // this.bugForm = new FormGroup({
        //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     status: new FormControl(this.currentBug.status, Validators.required),
        //     severity: new FormControl(this.currentBug.severity, Validators.required),
        //     description: new FormControl(this.currentBug.description, Validators.required)
        // });
        if (parkingStation) {
            this.currentParkingStation = new ParkingStation(
                parkingStation.title ,
                parkingStation.address,
                parkingStation.type,
                parkingStation.lat,
                parkingStation.lng,
                parkingStation.size,
                parkingStation.availableSpots,
                parkingStation.availability,
                parkingStation.rate
            );
        }

        this.parkingForm = this.formB.group({
            title: [this.currentParkingStation.title, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            address: [this.currentParkingStation.address, Validators.required],
            type: [this.currentParkingStation.type, Validators.required],
            lat: [this.currentParkingStation.lat, Validators.required],
            lng: [this.currentParkingStation.lng, Validators.required],
            size: [this.currentParkingStation.size, Validators.required],
            availableSpots: [this.currentParkingStation.availableSpots, Validators.required],
            availability: [this.currentParkingStation.availability, Validators.required],
            rate: [this.currentParkingStation.rate, Validators.required]

        });
    }

    // submitForm() {
    //     this.currentParkingStation.title = this.bugForm.value["title"];
    //     this.currentParkingStation.status = this.bugForm.value["status"];
    //     this.currentParkingStation.severity = this.bugForm.value["severity"];
    //     this.currentParkingStation.description = this.bugForm.value["description"];
    //     if (this.currentParkingStation.id) {
    //         this.updateBug();
    //     } else {
    //         this.addBug();
    //     }
    // }
    //
    // addBug() {
    //     this.BugService.addBug(this.currentParkingStation);
    // }
    //
    // updateBug() {
    //     this.BugService.updateBug(this.currentParkingStation);
    // }
    //
    // freshForm() {
    //     this.bugForm.reset({ status: this.statuses, severity: this.severities });
    //     this.cleanBug();
    // }
    //
    // cleanBug() {
    //     this.currentParkingStation = new Bug(null, null, this.statuses, this.severities, null, null, null, null, null);
    // }

}