import {Component, OnInit, OnDestroy} from '@angular/core';

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

        $('.accordion').find('.accordion-toggle').click(function() {
            console.log('clickd');
            $(this).next().slideToggle('600');
            $(".accordion-content").not($(this).next()).slideUp('600');
        });

        $('.accordion-toggle').on('click', function() {
            $(this).toggleClass('active').siblings().removeClass('active');
        });
        this.getAddedBookings();
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