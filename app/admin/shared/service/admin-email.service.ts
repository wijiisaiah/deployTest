import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {FirebaseConfigService} from "../../../core/service/firebase-config.service";
import {Email} from "../../../shared/model/email";

@Injectable()
export class AdminEmailService {

    private databaseRef = this.fire.database;
    private emailRef = this.databaseRef.ref('/emails/email information/details');

    constructor(private fire: FirebaseConfigService) {
    }

    getAddedEmails(): Observable<any> {

        return Observable.create(obs => {
            this.emailRef.on('child_added', email => {
                    const newEmail = email.val() as Email;
                    obs.next(newEmail);
                },

                err => {
                    obs.throw(err);
                });
        });

    }

    getUpdatedEmails(): Observable<any> {

        return Observable.create(obs => {
            this.emailRef.on('child_changed', email => {
                    const newEmail = email.val() as Email;
                    obs.next(newEmail);
                },

                err => {
                    obs.throw(err);
                });
        });

    }

    updateEmail(email: Email){
        let updateEmailRef = this.emailRef.child(email.type);
        updateEmailRef.update({
            from: email.from,
            subject: email.subject,
            body: email.body,
            type: email.type
        })
    }

}