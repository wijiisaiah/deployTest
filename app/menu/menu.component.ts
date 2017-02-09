/**
 * Created by Isaiah on 2017-01-31.
 */
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from "../shared/services/user.service";
import { User } from "../shared/model/user";
import {BookingService} from "../shared/services/booking.service";
import {Router} from "@angular/router";
import {MenuService} from "../shared/services/menu.service";
declare let $:any;



@Component({
    moduleId: module.id,
    selector: 'user-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {

    private currentUser = new User(null, null, null, null, null);
    private currentBooking;
    private userAccountHidden = true;
    private userBookingsHidden = true;
    private userMenuHidden = false;

    constructor(private uas: UserService, private BookingService: BookingService, private router: Router, private menuService: MenuService) {
    }

    ngOnInit() {
        this.getCurrentUser();
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
        this.uas.getCurrentUser()
            .subscribe(user => {
                this.currentUser = user;
            },
            err => {
                console.error("Unable to get current user -", err);
            });
    }

    replaceMenuContent(replaceThis: string, withThis: string){
        switch (replaceThis){
            case 'menu': {
                this.userMenuHidden = true;
                switch (withThis){
                    case 'account': this.userAccountHidden = false; return;
                    case 'booking': {
                        this.userBookingsHidden = false;
                        console.log("call update here");
                    }
                }
                return;
            }
            default:{
                this.userAccountHidden = true;
                this.userBookingsHidden = true;
                this.userMenuHidden = false;
            }
        }

    }

    reRoute(){
        this.router.navigate(['/login']);
    }

    changeMenu() {
        this.menuService.changeMenu();
    }


}