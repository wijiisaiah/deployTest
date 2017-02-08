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
    private bookingObject = {};

    constructor(private bookingService: BookingService) {
        this.bookingObject['title'] = '';
        this.bookingObject['address'] = '';
        this.bookingObject['rate'] = '';
        this.bookingObject['date'] = '';
        this.bookingObject['startTime'] = '';
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
                    console.log('Before assigning', this.bookingObject);
                    console.log(booking);
                    this.bookingObject['title'] = booking.parkingStation.title;
                    this.bookingObject['address'] = booking.parkingStation.address;
                    this.bookingObject['rate'] = booking.parkingStation.rate;
                    this.bookingObject['date'] = booking.date;
                    this.bookingObject['startTime'] = booking.startTime;
                    console.log(this.bookingObject);
                },
                err => {
                    console.error("Unable to get current booking -", err);
                });

    }

}