import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { User } from '../model/user';
import { Email } from '../model/email';

@Injectable()
export class EmailService {

    private databaseRef = this.fire.database.ref('/users');
    private currentUserRef: any;
    private userEmail: any;

    constructor(private fire: FirebaseConfigService) {
        let currentUser = this.fire.auth.currentUser;
        this.userEmail = currentUser.email;
    }

    createEmail(emailType: string): Observable<any> {

        let email = new Email(null, this.userEmail, null, null);

        const emailRef = this.databaseRef.child('emails').child('email information').child('details').child(emailType);
        return Observable.create(obs => {
            emailRef.on('value', emailInfo => {
                email = emailInfo.val() as Email;
                obs.next(email);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

    sendEmail(email: Email) {

        const newEmailRef = this.databaseRef.child('emails').child('email to send');
        const ref = newEmailRef.push();

         ref.set({
            from: email.from,
            to: email.to,
            subject: email.subject,
            body: email.body
        })
            .catch(err => console.error("Unable to add Booking", err));

    }

}