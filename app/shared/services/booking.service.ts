import {Injectable} from '@angular/core';

import {FirebaseConfigService} from '../../core/service/firebase-config.service';
import {UserService} from "./user.service";
import Reference = firebase.storage.Reference;
import {ParkingStation} from "../model/parkingStation";
import {Booking} from "../model/booking";
import {Time} from "../util/Time";
import {Observable} from "rxjs/Observable";
import {ParkingService} from "./parkingStation.service";
import {EmailService} from "./email.service";


@Injectable()
export class BookingService {

    private currentUserRef: any;
    private reservationTimeOut: number = 30 * 60 * 1000;
    private databaseRef = this.fire.database;

    constructor(private fire: FirebaseConfigService, private us: UserService, private parkingService: ParkingService, private emailService: EmailService) {
        let curUser = this.fire.auth.currentUser;
        this.currentUserRef = this.databaseRef.ref('/users').child(curUser.uid);
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

            bookingsRef.on('child_changed', booking => {
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
                        obs.next(undefined);
                    }
                },
                err => {
                    obs.throw(err);
                });
        });

    }

    getBookingCodes(): Promise<any> {

        const ref = this.databaseRef.ref('booking codes').child('codes');

        return new Promise((fulfill) => {
            ref.on('value', bookingCodes => {
                console.log(bookingCodes);
                if (bookingCodes.val() !== null) {
                    let codes = bookingCodes.val() as Array<any>;
                    console.log('codes', codes);
                    fulfill(codes);
                }else {
                    fulfill([]);
                }
            })
        });

    }

    cancelBooking(currentBooking: Booking){
        this.removeBookingCode(currentBooking.code);
        this.removeCurrentBooking(currentBooking.parkingStation.title);
        this.emailService.createEmail(EmailService.BOOKING_CANCELLATION);
    }

    completeBooking(currentBooking: Booking) {
        this.endCurrentBooking(currentBooking);
        this.addToUserBookings(currentBooking);
        this.removeCurrentBooking(currentBooking.parkingStation.title);
        this.removeBookingCode(currentBooking.code);
        this.emailService.createEmail(EmailService.BOOKING_COMPLETION);
    }


    /* Creates a new booking in user -> current booking in the database. It sets
     * the bookings start time (both in time format and in milliseconds), date, parking station,
     * and randomely generated booking code.
     */
    createBooking(parkingStation: ParkingStation) {
        let date = Time.getCurrentDate();
        let startTime = Time.getCurrentTime();
        let startTimeMs = new Date().getTime();

        const reservationRef = this.currentUserRef.child('reservation');
        const currentBookingRef = this.currentUserRef.child('reservation').child('curBooking');

        this.parkingService.decrementAvailability(parkingStation.title);

        reservationRef.set({
            reserveStartTime: new Date().getTime(),
            reserveEndTime: new Date().getTime() + this.reservationTimeOut
        })
            .catch(err => console.error("Unable to set reservation", err));

        this.generateCode()
            .then((code) => {
                currentBookingRef.set({
                    parkingStation: parkingStation,
                    date: date,
                    startTime: startTime,
                    startTimeMs: startTimeMs,
                    code: code
                })
                    .catch(err => console.error("Unable to add Booking", err));
                let booking = new Booking(parkingStation, date, startTime, startTimeMs, code);
                this.emailService.createEmail(EmailService.BOOKING_CONFIRMATION, null , booking);
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
    addToUserBookings(booking: Booking) {

        const bookingsRef = this.currentUserRef.child('bookings');
        const ref = bookingsRef.push();

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
    }

    removeBookingCode(number: number){
        const ref = this.databaseRef.ref('booking codes').child('codes');
        ref.orderByValue().equalTo(number).on('child_added', function(snapshot){
            console.log(snapshot.ref);
            snapshot.ref.remove();
        });
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

    generateCode(): Promise<number> {
        let that = this;
        let code;

        return new Promise((fulfill) => {
            this.getBookingCodes()
                .then((codes) => {
                    console.log("codes", codes);

                    // code = Math.floor(Math.random() * 900000) + 100000;
                    // let temp = 10;
                    let recurssiveGenerator = () => {
                        let newCode = Math.floor(Math.random() * 900000) + 100000;
                        // let newCode = temp;
                        console.log(codes);
                        for (let key in codes) {
                            // console.log('KEY', key);
                            // console.log('CODES[KEY]', codes[key]);
                            if (codes[key] === newCode) {
                                console.log('Found duplicate code');
                                newCode = Math.floor(Math.random() * 900000) + 100000;
                                return recurssiveGenerator();
                            }
                        }
                        return newCode;
                    };
                    code = recurssiveGenerator();
                    const ref = this.databaseRef.ref('booking codes').child('codes');
                    ref.push(code);
                    fulfill(code);
                });
        });

    }




}