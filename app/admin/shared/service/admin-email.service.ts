import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {FirebaseConfigService} from "../../../core/service/firebase-config.service";
import {Email} from "../../../shared/model/email";
/**
 * Created by Isaiah on 2017-02-06.
 */
@Injectable()
export class AdminParkingService {

    private databaseRef = this.fire.database;
    private emailRef = this.databaseRef.ref('/emails/email information/details');
    public emails: Email[];

    constructor(private fire: FirebaseConfigService) {
        this.getEmails();
    }

    getEmails(): Observable<any> {

        return Observable.create(obs => {
            this.emailRef.on('value', email => {
                    const newEmail = email.val() as Email;
                    this.emails.push(newEmail);
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