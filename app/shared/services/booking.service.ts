import { Injectable } from '@angular/core';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';
import { UserService } from "./user.service";
import { User } from "../model/user";
import Reference = firebase.storage.Reference;
import { ParkingStation } from "../model/parkingStation";
import { Booking } from "../model/booking";
import { Time } from "../util/Time";
import { Observable } from "rxjs/Observable";


@Injectable()
export class BookingService {

    private currentUserRef: any;
    private databaseRef = this.fire.database.ref('/users');

    constructor(private fire: FirebaseConfigService, private us: UserService) {
        let curUser = this.fire.auth.currentUser;
        this.currentUserRef = this.databaseRef.child(curUser.uid);
    }

    /* Listens for bookings added to user -> bookings in the database
    * Returns an Observable with the newly added booking
    */
    getAddedBookings(): Observable<any> {

        const bookingsRef = this.currentUserRef.child('bookings');

        return Observable.create(obs => {
            bookingsRef.on('child_added', booking => {
                const newBooking = booking.val() as Booking;
                obs.next(newBooking);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

     /* Listens for changes to user -> current booking in the database
    * Returns an Observable with the updated current booking
    */
    getUpdatedBooking(): Observable<any> {

        const currentBookingRef = this.currentUserRef.child('current booking');

        return Observable.create(obs => {
            currentBookingRef.on('child_changed', booking => {
                const updatedBooking = booking.val() as Booking;
                obs.next(updatedBooking);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

     /* Creates a new booking in user -> current booking in the database. It sets
     * the bookings start time, date and parking station.
     */
    public createBooking(parkingStation: ParkingStation) {
        let t = new Time();
        let date = t.getCurrentDate();
        let startTime = t.getCurrentTime();
        let newBooking = new Booking(parkingStation, date, startTime);

        const currentBookingRef = this.currentUserRef.child('current booking');
        currentBookingRef.set({
            ParkingStation: parkingStation,
            date: date,
            startTime: startTime
        })
            .catch(err => console.error("Unable to add Booking", err));

    }

    /* Sets the end time and cost of the current booking in
    * user -> current booking in the database
    */
    updateCurrentBooking() {

        let t = new Time();
        let endTime = t.getCurrentTime();
        const cost = 5;
        const currentBookingRef = this.currentUserRef.child('current booking');

        currentBookingRef.set({
            endTime: endTime,
            cost: cost
        })
        .catch(err => console.error("Unable to update current booking -", err));

    }

    /* Takes a booking as an argument and adds it to the database
    *  under user -> bookings.
    */
    public addBooking(booking: Booking) {

        const bookingsRef = this.currentUserRef.child('bookings');
        console.log("bookingsRef created");
        const ref = bookingsRef.push();
        console.log("Pushed to bookingsRef");

        ref.set({
            ParkingStation: booking.parkingStation,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            cost: booking.totalCost
        })
            .catch(err => console.error("Unable to add Booking", err));

    }

    /* 
    * Deletes the current booking from the database under user -> current booking.
    */
    removeCurrentBooking() {
        const currentBookingRef = this.currentUserRef.child('current booking');
        currentBookingRef.remove();
    }


}