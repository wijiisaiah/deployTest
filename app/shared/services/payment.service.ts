import { Injectable } from '@angular/core';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';
import { UserService } from "./user.service";
import Reference = firebase.storage.Reference;
import { ParkingStation } from "../model/parkingStation";
import { Booking } from "../model/booking";
import { Time } from "../util/Time";
import { Observable } from "rxjs/Observable";
import { ParkingService } from "./parkingStation.service";
import { EmailService } from "./email.service";

@Injectable()
export class PaymentService {

    private databaseRef: any;
    private curUser: any;

    constructor(private fire: FirebaseConfigService, private us: UserService, private parkingService: ParkingService, private emailService: EmailService) {
        this.curUser = this.fire.auth.currentUser;
        this.databaseRef = this.fire.database;
    }

    createCustomer (token: any) {
        
        const customerRef = this.databaseRef.ref('billing').child('new customer');

        customerRef.set({
            uid: this.curUser.uid,
            email: this.curUser.email,
            tokenId: token.id
        });
        
    }
}