import {Injectable} from '@angular/core';

import {FirebaseConfigService} from '../../core/service/firebase-config.service';
import {UserService} from "./user.service";
import {User} from "../model/user";
import Reference = firebase.storage.Reference;
import {ParkingStation} from "../model/parkingStation";
import {Booking} from "../model/booking";
import {Time} from "../util/Time";


@Injectable()
export class BookingService {

    private currentUserRef: any;
    private databaseRef = this.fire.database.ref('/users');


    constructor(private fire: FirebaseConfigService,private us: UserService) {
        let curUser = this.fire.auth.currentUser;
        this.currentUserRef = this.databaseRef.child(curUser.uid);
    }


    public createBooking(parkingStation: ParkingStation){
        let t = new Time();
        let date = t.getCurrentDate();
        let startTime = t.getCurrentTime();
        let newBooking = new Booking (parkingStation, date, startTime );
        this.currentUserRef.child('bookings').push(newBooking);

    }


}