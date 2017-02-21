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
    private userCurrentBookingHidden = true;
    private userMenuHidden = false;
    private subscriptions: Subscription[] = [];

    constructor(private uas: UserService, private BookingService: BookingService, private router: Router, private menuService: MenuService) {
    }

    ngOnDestroy() {
        for(let subs of this.subscriptions){
            subs.unsubscribe();
        }
        console.log('Menu Destroyed');
    }

    ngOnInit() {
        this.getCurrentUser();
        this.getCurrentBooking();
        this.menuService.isOpen = false;
        if ((window.innerWidth <= 900) && (window.innerWidth >= 600)){
            this.menuService.menuSize = 45;
        }
        else if (window.innerWidth < 600){
            this.menuService.menuSize = 100;
        }else {
            this.menuService.menuSize = MenuService.defaultMenuSize;
        }
    }

    /* Close when someone clicks on the "x" symbol inside the overlay */

    signOut() {
        this.uas.signOut();
    }

    getCurrentBooking() {
        let temp = this.BookingService.getCurrentBooking()
            .subscribe(booking => {
                    this.currentBooking = booking;
                },
                err => {
                    console.error("Unable to get current user -", err);
                });

        this.subscriptions.push(temp);
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

// '', menu
    replaceMenuContent(replaceThis: string, withThis: string) {

        switch (replaceThis) {
            case 'menu': {
                this.userMenuHidden = true;
                switch (withThis) {
                    case 'account': {
                        this.userAccountHidden = false;
                        this.menuService.setMenuSize(MenuService.accountPageSize);
                    }
                        return;
                    case 'booking': {
                        this.menuService.setMenuSize(MenuService.bookingPageSize);
                        this.userBookingsHidden = false;
                        console.log("call update here");
                    }
                        return;
                    case 'current booking': {
                        this.menuService.setMenuSize(MenuService.accountPageSize);
                        this.userCurrentBookingHidden = false;
                        console.log("call update here");
                    }
                        return;
                }
                return;
            }
            default: {
                this.menuService.setMenuSize(MenuService.defaultMenuSize);
                this.userAccountHidden = true;
                this.userBookingsHidden = true;
                this.userCurrentBookingHidden = true;
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