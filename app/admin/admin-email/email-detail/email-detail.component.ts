import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AdminEmailService } from './../../shared/service/admin-email.service';

import { forbiddenStringValidator } from '../../../shared/validation/forbidden-string.validator';
import { Email } from './../../../shared/model/email';

@Component({
    moduleId: module.id,
    selector: 'email-detail',
    templateUrl: 'email-detail.component.html',
    styleUrls: ['email-detail.component.css']
})
export class AdminEmailDetailComponent implements OnInit {

    private modalId = "emailModal";
    private emailForm: FormGroup;
    private currentEmail = new Email(null, null, null, null, null);
    constructor(private formB: FormBuilder, private aes: AdminEmailService) { }

    ngOnInit() {
        this.configureForm();
    }

    configureForm(email?: Email) {
        // this.bugForm = new FormGroup({
        //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     status: new FormControl(this.currentBug.status, Validators.required),
        //     severity: new FormControl(this.currentBug.severity, Validators.required),
        //     description: new FormControl(this.currentBug.description, Validators.required)
        // });
        if (email) {
            this.currentEmail = new Email(
                email.type,
                email.from,
                email.subject,
                email.body,
            );
        }

        this.emailForm = this.formB.group({
            type: [this.currentEmail.type, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            from: [this.currentEmail.from, Validators.required],
            subject: [this.currentEmail.subject, Validators.required],
            body: [this.currentEmail.body, Validators.required]
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