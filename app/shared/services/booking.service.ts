import {Injectable} from '@angular/core';

import {FirebaseConfigService} from '../../core/service/firebase-config.service';
import {UserService} from "./user.service";
import {User} from "../model/user";
import Reference = firebase.storage.Reference;
import {ParkingStation} from "../model/parkingStation";
import {Booking} from "../model/booking";
import {Time} from "../util/Time";
import {Observable} from "rxjs/Observable";
import {ParkingService} from "./parkingStation.service";


@Injectable()
export class BookingService {

    private currentUserRef: any;
    private reservationTimeOut: number = 30 * 60 * 1000;
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

        const reservationRef = this.currentUserRef.child('reservation');
        const currentBookingRef = this.currentUserRef.child('reservation').child('curBooking');

        this.parkingService.decrementAvailability(newBooking.parkingStation.title);

        reservationRef.set({
            reserveStartTime: new Date().getTime(),
            reserveEndTime: new Date().getTime() + this.reservationTimeOut
        })
            .catch(err => console.error("Unable to set reservation", err));

        currentBookingRef.set({
            parkingStation: parkingStation,
            date: date,
            startTime: startTime,
            startTimeMs: startTimeMs
        })
            .catch(err => console.error("Unable to add Booking", err));
    }

    public completeBooking(currentBooking: Booking) {
        this.endCurrentBooking(currentBooking);
        console.log("CurrentBooking updated", currentBooking);

        // console.log("Parking station: ", currentBooking.parkingStation);

        this.addBooking(currentBooking);
        // console.log("Current booking added to bookings");

        this.removeCurrentBooking(currentBooking.parkingStation.title);
        // console.log("Current booking removed");
    }

    /* Listens for bookings added to user -> current booking in the database
     * Returns an Observable with the newly added current booking
     */
    getCurrentBooking(): Observable<any> {

        const bookingsRef = this.currentUserRef.child('reservation');

        return Observable.create(obs => {
            bookingsRef.on('child_added', booking => {
                    if (booking.key === 'curBooking') {
                        const parkingStation = booking.child('parkingStation').val() as ParkingStation;
                        const curBooking = booking.val() as Booking;
                        curBooking.parkingStation = parkingStation;
                        obs.next(curBooking);
                    }
                },
                err => {
                    obs.throw(err);
                });

            bookingsRef.on('child_removed', booking => {

                    if (booking.key === 'curBooking') {
                        console.log('childremoved', booking);
                        let parking = new ParkingStation('', '', '', 0, 0, 0, 0, true, 0);
                        obs.next(undefined);
                    }
                },
                err => {
                    obs.throw(err);
                });
        });
    }

    getReservationTimer(): Observable<any> {

        const bookingsRef = this.currentUserRef.child('reservation');

        return Observable.create(obs => {
            bookingsRef.on('child_added', booking => {
                    if (booking.key === 'reserveEndTime') {
                        obs.next(booking.val() as number);
                    }
                },
                err => {
                    obs.throw(err);
                });

            bookingsRef.on('child_removed', booking => {
                    if (booking.key === 'reserveEndTime') {
                        console.log('childremoved', booking);
                        obs.next(undefined);
                    }
                },
                err => {
                    obs.throw(err);
                });
        });


    }

    /* Sets the end time and cost of the argument booking */
    endCurrentBooking(curBooking: Booking) {

        let endTime = Time.getCurrentTime();
        const cost = this.calculateCost(curBooking);

        curBooking.endTime = endTime;
        curBooking.cost = cost;
    }

    updateCurrentBooking(curBooking: Booking) {

        let startTime = Time.getCurrentTime();
        let startTimeMs = new Date().getTime();
        curBooking.startTime = startTime;
        curBooking.startTimeMs = startTimeMs;
        const currentBookingRef = this.currentUserRef.child('reservation').child('curBooking');
        currentBookingRef.update(curBooking);
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
    removeCurrentBooking(title: string) {
        const reservationRef = this.currentUserRef.child('reservation');
        reservationRef.ref.remove();
        this.parkingService.incrementAvailability(title);
        console.log("Removed");
    }

    calculateCost(booking: Booking): string {

        const endTime = new Date().getTime();
        const startTime = booking.startTimeMs;

        const durationMs = endTime - startTime;
        const durationHrs = durationMs / (3600 * 1000);

        const cost = (durationHrs * booking.parkingStation.rate).toFixed(3);

        console.log("Cost: " + cost + " Rate: " + booking.parkingStation.rate + " Duration: " + durationHrs);

        return cost;

    }

    calculateTimeRemaining(){

    }

}