import {Component, OnInit, OnDestroy} from '@angular/core';

import {BookingService} from '../../shared/services/booking.service';

import {Booking} from '../../shared/model/booking';
import {ParkingStation} from "../../shared/model/parkingStation";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'my-bookings',
    templateUrl: 'my-bookings.component.html',
    styleUrls: ['my-bookings.component.css']

})
export class MyBookingsComponent implements OnInit, OnDestroy {

    private bookings: Booking[] = [];
    private currentBooking = undefined;
    private subscriptions: Subscription[] = [];
    constructor(private bookingService: BookingService) {

    }

    ngOnDestroy() {
        for(let subs of this.subscriptions){
            subs.unsubscribe();
        }
    }

    ngOnInit() {
        this.getAddedBookings();
        this.getCurrentBooking();
    }

    getAddedBookings() {
        let temp = this.bookingService.getAddedBookings()
            .subscribe(booking => {
                    this.bookings.push(booking);
                },
                err => {
                    console.error("Unable to get added booking - ", err);
                });
        this.subscriptions.push(temp);
    }

    getCurrentBooking() {
        this.bookingService.getCurrentBooking()
            .subscribe((booking: Booking) => {
                    this.currentBooking = booking;
                    if (booking === undefined){

                    }
                },
                err => {
                    console.error("Unable to get current booking -", err);
                });

    }

}