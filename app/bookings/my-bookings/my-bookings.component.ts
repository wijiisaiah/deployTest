import {Component, OnInit, OnDestroy, AfterViewInit, HostListener} from '@angular/core';

import {BookingService} from '../../shared/services/booking.service';

import {Booking} from '../../shared/model/booking';
import {ParkingStation} from "../../shared/model/parkingStation";
import {Subscription} from "rxjs";
declare let $: any;

@Component({
    moduleId: module.id,
    selector: 'my-bookings',
    templateUrl: 'my-bookings.component.html',
    styleUrls: ['my-bookings.component.css']

})
export class MyBookingsComponent implements OnInit, OnDestroy {


    private bookings: Booking[] = [];
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
    }

    open(index: number){
        for (let each in document.getElementsByClassName('accordion-toggle')) {
            $(each).toggleClass('active').removeClass('active');
        }
        console.log(index);
        let temp = document.getElementsByClassName('accordion-toggle').item(index );
        $(temp).next().slideToggle('600');
        $(".accordion-content").not($(temp).next()).slideUp('600');

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
}