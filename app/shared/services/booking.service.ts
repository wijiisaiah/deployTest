import { Injectable } from '@angular/core';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';
import { UserService } from "./user.service";
import { User } from "../model/user";
import Reference = firebase.storage.Reference;
import { ParkingStation } from "../model/parkingStation";
import { Booking } from "../model/booking";
import { Time } from "../util/Time";
import { Observable } from "rxjs/Observable";
import {ParkingService} from "./parkingStation.service";


@Injectable()
export class BookingService {

    private currentUserRef: any;
    private databaseRef = this.fire.database.ref('/users');

    constructor(private fire: FirebaseConfigService, private us: UserService, private parkingService: ParkingService) {
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

    /* Creates a new booking in user -> current booking in the database. It sets
    * the bookings start time, date and parking station.
    */
    public createBooking(parkingStation: ParkingStation) {
        let date = Time.getCurrentDate();
        let startTime = Time.getCurrentTime();
        let startTimeMs = new Date().getTime();
        let newBooking = new Booking(parkingStation, date, startTime, startTimeMs);

        const currentBookingRef = this.currentUserRef.child('current booking').child('curBooking');

        this.parkingService.decrementAvailability(newBooking);

        currentBookingRef.set({
            ParkingStation: parkingStation,
            date: date,
            startTime: startTime,
            startTimeMs: startTimeMs
        })
            .catch(err => console.error("Unable to add Booking", err));
    }

    public completeBooking(currentBooking: Booking){
        this.updateCurrentBooking(currentBooking);
        console.log("CurrentBooking updated", currentBooking);

        console.log("Parking station: ", currentBooking.parkingStation);

        this.addBooking(currentBooking);
        console.log("Current booking added to bookings");

        this.removeCurrentBooking();
        console.log("Current booking removed");
    }

    /* Listens for bookings added to user -> current booking in the database
    * Returns an Observable with the newly added current booking
    */
    getCurrentBooking(): Observable<any> {

        const bookingsRef = this.currentUserRef.child('current booking');

        return Observable.create(obs => {
            bookingsRef.on('child_added', booking => {
                const parkingStation = booking.child('ParkingStation').val() as ParkingStation;
                const curBooking = booking.val() as Booking;
                curBooking.parkingStation = parkingStation;
                obs.next(curBooking);
            },
                err => {
                    obs.throw(err);
                });

            bookingsRef.on('child_removed', booking => {
                    let parking = new ParkingStation('', '', '', 0, 0, 0, 0, true, 0);
                    obs.next(new Booking(parking,'','', 0));
                },
                err => {
                    obs.throw(err);
                });
        });
    }

    /* Sets the end time and cost of the argument booking */
    updateCurrentBooking(curBooking: Booking) {

        let endTime = Time.getCurrentTime();
        const cost = this.calculateCost(curBooking);

        curBooking.endTime = endTime;
        curBooking.cost = cost;
    }

    /* Takes a booking as an argument and adds it to the database
    *  under user -> bookings.
    */
    public addBooking(booking: Booking) {

        const bookingsRef = this.currentUserRef.child('bookings');
        console.log("bookingsRef created");
        const ref = bookingsRef.push();
        console.log("Pushed to bookingsRef");

        this.parkingService.incrementAvailability(booking);

        ref.set({
            title: booking.parkingStation.title,
            address: booking.parkingStation.address,
            rate: booking.parkingStation.rate,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            cost: booking.cost
        })
            .catch(err => console.error("Unable to add Booking", err));

    }

    /* 
    * Deletes the current booking from the database under user -> current booking.
    */
    removeCurrentBooking() {
        const currentBookingRef = this.currentUserRef.child('current booking');
        currentBookingRef.ref.remove();
        console.log("Removed");
    }

    calculateCost(booking: Booking): string {

    const endTime = new Date().getTime();
    const startTime = booking.startTimeMs;

    const durationMs = endTime - startTime;
    const durationHrs = durationMs / (3600*1000);

    const cost = (durationHrs * booking.parkingStation.rate).toFixed(3);

    console.log("Cost: " + cost + " Rate: " + booking.parkingStation.rate + " Duration: " + durationHrs);

    return cost;

    }

}