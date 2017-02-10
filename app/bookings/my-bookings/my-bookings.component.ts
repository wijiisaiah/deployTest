import {Component, OnInit} from '@angular/core';

import {BookingService} from '../../shared/services/booking.service';

import {Booking} from '../../shared/model/booking';
import {ParkingStation} from "../../shared/model/parkingStation";

@Component({
    moduleId: module.id,
    selector: 'my-bookings',
    templateUrl: 'my-bookings.component.html',
    styleUrls: ['my-bookings.component.css']

})
export class MyBookingsComponent implements OnInit {

    private bookings: Booking[] = [];
    private currentBooking = undefined;

    constructor(private bookingService: BookingService) {

    }

    ngOnInit() {
        this.getAddedBookings();
        this.getCurrentBooking();
    }

    getAddedBookings() {
        this.bookingService.getAddedBookings()
            .subscribe(booking => {
                    this.bookings.push(booking);
                },
                err => {
                    console.error("Unable to get added booking - ", err);
                });
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