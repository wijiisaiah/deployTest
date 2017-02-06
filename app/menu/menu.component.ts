/**
 * Created by Isaiah on 2017-01-31.
 */
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from "../shared/services/user.service";
import { User } from "../shared/model/user";
import {BookingService} from "../shared/services/booking.service";
import {Router} from "@angular/router";
declare let $:any;



@Component({
    moduleId: module.id,
    selector: 'user-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {

    private currentUser = new User(null, null, null, null, null);
    private userAccountHidden = true;
    private userBookingsHidden = true;
    private userMenuHidden = false;

    constructor(private uas: UserService, private BookingService: BookingService, private router: Router) {
    }

    ngOnInit() {
        this.getCurrentUser();
    }

    /* Close when someone clicks on the "x" symbol inside the overlay */
    public closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }
    public openNav(){
        document.getElementById("myNav").style.width = "75%";
    }

    signOut() {
        this.uas.signOut();
        this.reRoute();
    }

    getCurrentUser() {
        this.uas.getCurrentUser()
            .subscribe(user => {
                this.currentUser = user;
                console.log("Current user - ", this.currentUser);
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

}