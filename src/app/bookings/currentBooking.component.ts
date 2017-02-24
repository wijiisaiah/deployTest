import {Component, OnInit, OnDestroy} from '@angular/core';

import {BookingService} from '../shared/services/booking.service';

import {Booking} from '../shared/model/booking';
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'current-booking',
    templateUrl: 'currentBooking.component.html'
})
export class CurrentBookingComponent implements OnInit, OnDestroy {

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
        this.getCurrentBooking();
    }

    getCurrentBooking() {
        let temp = this.bookingService.getCurrentBooking()
            .subscribe((booking: Booking) => {
                    this.currentBooking = booking;
                    if (booking === undefined){
                    }
                },
                err => {
                    console.error("Unable to get current booking -", err);
                });

        this.subscriptions.push(temp);

    }


}