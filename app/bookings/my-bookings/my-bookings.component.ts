import { Component, OnInit } from '@angular/core';

import { BookingService } from '../../shared/services/booking.service';

import { Booking } from '../../shared/model/booking';

@Component({
    moduleId: module.id,
    selector: 'my-bookings',
    templateUrl: 'my-bookings.component.html',
    styleUrls: ['my-bookings.component.css']

})
export class MyBookingsComponent { 

    private currentBooking = new Booking(null, null, null, null, null);

    constructor(private bookingService: BookingService){

    }
}