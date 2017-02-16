import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { User } from '../model/user';
import { Email } from '../model/email';

@Injectable()
export class EmailService {

    private databaseRef = this.fire.database.ref('/emails');
    private currentUserRef: any;
    private userEmail: any;

    constructor(private fire: FirebaseConfigService) {
        let currentUser = this.fire.auth.currentUser;
        this.userEmail = currentUser.email;
    }

    createEmail(emailType: string): Promise<any> {

        let email = new Email(null, null, null, null);

        const emailRef = this.databaseRef.child('email information').child('details').child(emailType);
        // return Observable.create(obs => {
        //     emailRef.on('value', emailInfo => {
        //         email = emailInfo.val() as Email;
        //         console.log('raw data', emailInfo);
        //         obs.next(email);
        //         console.log('obs next set', email);
        //     },
        //         err => {
        //             obs.throw(err);
        //         });
        // });

        return new Promise((fulfill) => {
            emailRef.on('value', emailInfo => {
                email = emailInfo.val() as Email;
                console.log('raw data', emailInfo);
                console.log('obs next set', email);
                this.sendEmail(email);
            });
        }) 
    }

    sendEmail(email: Email) {

        const newEmailRef = this.databaseRef.child('email to send').child('email');
        // const ref = newEmailRef.push();
        console.log('pushed to newEmailRef');
        newEmailRef.set({
            from: email.from,
            to: this.userEmail,
            subject: email.subject,
            body: email.body
        })
            .catch(err => console.error("Unable to add Booking", err));

    }

}