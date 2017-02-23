import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AdminUserService } from './../../shared/service/admin-user.service';

import { forbiddenStringValidator } from '../../../shared/validation/forbidden-string.validator';
import {User} from "../../../shared/model/user";

@Component({
    moduleId: module.id,
    selector: 'user-detail',
    templateUrl: 'user-detail.component.html',
    styleUrls: ['user-detail.component.css']
})
export class AdminUserComponent implements OnInit {
    private modalId = "bugModal";
    private parkingForm: FormGroup;
    private currentUser = new User(null, null, null, null, null, null, null);
    constructor(private formB: FormBuilder, private aus: AdminUserService) { }

    ngOnInit() {
        this.configureForm();
    }

    configureForm(user?: User) {
        // this.bugForm = new FormGroup({
        //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     status: new FormControl(this.currentBug.status, Validators.required),
        //     severity: new FormControl(this.currentBug.severity, Validators.required),
        //     description: new FormControl(this.currentBug.description, Validators.required)
        // });
        if (user) {
            this.currentUser = new User(
                user.name ,
                user.uid,
                user.email,
                user.address,
                user.phoneNumber,
                user.currentBooking,
                user.pastBookings,
            );
        }

        this.parkingForm = this.formB.group({
            name: [this.currentUser.name, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            uid: [this.currentUser.uid, Validators.required],
            email: [this.currentUser.email, Validators.required],
            address: [this.currentUser.address, Validators.required],
            phoneNumber: [this.currentUser.phoneNumber, Validators.required],
            currentBooking: [this.currentUser.currentBooking, Validators.required],
            pastBookings: [this.currentUser.pastBookings, Validators.required],
          
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