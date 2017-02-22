import { Injectable } from '@angular/core';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';
import { UserService } from "./user.service";
import { ParkingService } from "./parkingStation.service";
import { EmailService } from "./email.service";

import { ParkingStation } from "../model/parkingStation";
import { Booking } from "../model/booking";
import { User } from '../model/user';
import { Time } from "../util/Time";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PaymentService {

    private databaseRef: any;
    private curUser: any;

    constructor(private fire: FirebaseConfigService, private us: UserService, private parkingService: ParkingService, private emailService: EmailService) {
        this.databaseRef = this.fire.database;
        this.getCurrentUser();
    }

    getCurrentUser(){
        this.us.getCurrentUser()
            .subscribe(user => {
                this.curUser = user;
            });
    }

    createCustomer(token: any) {

        const customerRef = this.databaseRef.ref('billing').child('new customer').child('customer');

        customerRef.set({
            uid: this.curUser.uid,
            email: this.curUser.email,
            tokenId: token.id
        });

    }

    chargeCustomer(amount: string) {

        const customerRef = this.databaseRef.ref('billing').child('charge customer').child('customer');
        customerRef.set({
            customerId: this.curUser.customerId,
            amount: amount
        }).then( () => {
            this.databaseRef.ref('billing').child('charge customer').remove();
        });

    }

}