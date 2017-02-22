import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {FirebaseConfigService} from '../../core/service/firebase-config.service';
import {User} from '../model/user';
import {Email} from '../model/email';
import {Booking} from "../model/booking";


@Injectable()
export class EmailService {

    private databaseRef = this.fire.database.ref('/emails');
    private currentUserRef = this.fire.database.ref('/users');
    private userEmail: any;

    public static BOOKING_CONFIRMATION = 'booking confirmation';
    public static BOOKING_CANCELLATION = 'booking cancellation';
    public static BOOKING_COMPLETION = 'booking completion';
    public static REGISTRATION_CONFIRMATION = 'registration confirmation';

    constructor(private userService: UserService, private fire: FirebaseConfigService) {
        let currentUser = this.fire.auth.currentUser;
    }

    getUser() {
        this.userService.getCurrentUser()
            .subscribe((user) => {
                if (user) {
                    this.userEmail = user.email;
                }
            })
    }

    createEmail(emailType: string, userEmail?: string, booking?: Booking): Promise<any> {
        this.userEmail = this.fire.auth.currentUser.email;
        if (this.userEmail || userEmail) {
            
            if (userEmail){
                this.userEmail = userEmail;
            }

            let email = new Email(null, null, null, null);

            const emailRef = this.databaseRef.child('email information').child('details').child(emailType);

            return new Promise((fulfill) => {
                emailRef.on('value', emailInfo => {
                    email = emailInfo.val() as Email;
                    console.log('raw data', emailInfo);
                    console.log('obs next set', email);
                    this.sendEmail(email, userEmail, booking);
                });
            });
        } else {
            console.error('User email is undefined');
        }
    }

    sendEmail(email: Email, userEmail?: string, booking?: Booking) {
        if (userEmail){
            this.userEmail = userEmail;
        }

        if (booking){
            email.body = email.body + ": " + booking.parkingStation.address + '. This is your booking code, please use it to store and retrieve your bike: ' + booking.code;
            console.log(email.body);
        }

        const newEmailRef = this.databaseRef.child('email to send');
        const ref = newEmailRef.push({
            from: email.from,
            to: this.userEmail,
            subject: email.subject,
            body: email.body
        }) .catch(err => console.error("Unable to send Email", err));
        console.log('pushed to newEmailRef');


    }

}