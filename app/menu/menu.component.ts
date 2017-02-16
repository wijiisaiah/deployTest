/**
 * Created by Isaiah on 2017-01-31.
 */
import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/model/user";
import {BookingService} from "../shared/services/booking.service";
import {Router} from "@angular/router";
import {MenuService} from "../shared/services/menu.service";
import {Subscription} from "rxjs";
declare let $: any;


@Component({
    moduleId: module.id,
    selector: 'user-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

    private currentUser = new User(null, null, null, null, null);
    private currentBooking = null;
    private userAccountHidden = true;
    private userBookingsHidden = true;
    private userMenuHidden = false;
    private subscriptions: Subscription[] = [];

    constructor(private uas: UserService, private BookingService: BookingService, private router: Router, private menuService: MenuService) {
    }

    ngOnDestroy() {
        for(let subs of this.subscriptions){
            subs.unsubscribe();
        }
    }

    ngOnInit() {
        this.getCurrentUser();
        this.getCurrentBooking();
    }

    /* Close when someone clicks on the "x" symbol inside the overlay */

    signOut() {
        this.uas.signOut();
    }

    getCurrentBooking() {
        this.BookingService.getCurrentBooking()
            .subscribe(booking => {
                    this.currentBooking = booking;
                },
                err => {
                    console.error("Unable to get current user -", err);
                });
    }

    getCurrentUser() {
        let temp = this.uas.getCurrentUser()
            .subscribe(user => {
                    this.currentUser = user;
                },
                err => {
                    console.error("Unable to get current user -", err);
                });

        this.subscriptions.push(temp);

    }

    replaceMenuContent(replaceThis: string, withThis: string) {

        switch (replaceThis) {
            case 'menu': {
                this.userMenuHidden = true;
                switch (withThis) {
                    case 'account': {
                        this.userAccountHidden = false;
                        this.menuService.changeMenu(50);
                    }
                        return;
                    case 'booking': {
                        this.menuService.changeMenu(75);
                        this.userBookingsHidden = false;
                        console.log("call update here");
                    }
                }
                return;
            }
            default: {
                this.menuService.changeMenu(25);
                this.userAccountHidden = true;
                this.userBookingsHidden = true;
                this.userMenuHidden = false;
            }
        }

    }

    reRoute() {
        this.router.navigate(['/login']);
    }

    changeMenu() {
        this.menuService.changeMenu();
    }


}