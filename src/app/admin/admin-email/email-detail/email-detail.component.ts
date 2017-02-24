import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AdminEmailService } from '../../shared/service/admin-email.service';

import { forbiddenStringValidator } from '../../../shared/validation/forbidden-string.validator';
import { Email } from '../../../shared/model/email';
import {EmailService} from "../../../shared/services/email.service";



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
    private typeArr: string[] = [
        EmailService.BOOKING_CANCELLATION, EmailService.BOOKING_COMPLETION,
        EmailService.BOOKING_CONFIRMATION, EmailService.REGISTRATION_CONFIRMATION
    ];

    constructor(private formB: FormBuilder, private aes: AdminEmailService) { }

    ngOnInit() {
        this.configureForm();
    }

    configureForm(email?: Email) {

        if (email) {
            this.currentEmail = new Email(
                email.from,
                email.subject,
                null,
                email.body,
                email.type,
            );
        }

        console.log(this.currentEmail);
        console.log(this.typeArr);

        this.emailForm = this.formB.group({
            type: [this.currentEmail.type],
            from: [this.currentEmail.from],
            subject: [this.currentEmail.subject],
            body: [this.currentEmail.body]
        });
    }

    submitForm() {
        this.currentEmail.type = this.emailForm.value["type"];
        this.currentEmail.from = this.emailForm.value["from"];
        this.currentEmail.subject = this.emailForm.value["subject"];
        this.currentEmail.body = this.emailForm.value["body"];
        this.updateEmail();
    }

    updateEmail() {
        this.aes.updateEmail(this.currentEmail);
    }

    freshForm() {
        this.emailForm.reset({ });
        this.cleanBug();
    }

    cleanBug() {
        this.currentEmail = new Email(null, null, null, null);
    }

}
