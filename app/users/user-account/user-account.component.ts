import { Component, OnInit } from '@angular/core';

import { UserAuthenticationService } from '../services/user-authentication.service';

import { User } from '../model/user';

@Component({
    moduleId: module.id,
    selector: 'user-account',
    templateUrl: 'user-account.component.html',
    styleUrls: ['user-account.component.css']

})
export class UserAccountComponent implements OnInit {

    private currentUser = new User(null, null, null, null, null);

    constructor(private uas: UserAuthenticationService) { }

    ngOnInit() {
        this.getCurrentUser();
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

    updateUser() {

        this.currentUser.name = (<HTMLInputElement>document.getElementById('argName')).value;
        this.currentUser.email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        this.currentUser.address = (<HTMLInputElement>document.getElementById('argAddress')).value;

        this.uas.updateUser(this.currentUser);
    }

}