import { Component, OnInit } from '@angular/core';

import { AdminEmailService } from './../../shared/service/admin-email.service';

import { Email } from './../../../shared/model/email';

@Component({
    moduleId: module.id,
    selector: 'email-list',
    templateUrl: 'email-list.component.html',
    styleUrls: ['email-list.component.css']
})
export class AdminEmailListComponent implements OnInit {
    private emails: Email[] = [];

    constructor(private aes: AdminEmailService) { }

    ngOnInit() {
        this.getAddedEmails();
        this.getUpdatedEmails();
    }


    getAddedEmails() {
        this.aes.getAddedEmails()
        .subscribe(email => {
            this.emails.push(email);
        },
        err => {
            console.error("Unable to get added email - ", err);
        });
    }

    getUpdatedEmails() {
        this.aes.getUpdatedEmails()
        .subscribe(updatedEmail => {
            let newEmail = updatedEmail;
            const emailIndex = this.emails.map(index => index.type).indexOf(updatedEmail['type']);
            this.emails[emailIndex] = newEmail;
        },
        err => {
            console.log("Unable to get updated email - ", err);
        });
    }

}