import { Component } from '@angular/core';

import { UserAuthenticationService } from '../services/user-authentication.service';

import { User } from '../model/user';

@Component({
    moduleId: module.id,
    selector: 'user-authentication',
    templateUrl: 'user-authentication.component.html',
    styleUrls: ['user-authentication.component.css']
})
export class UserAuthenticationComponent {

    private currentUser = new User(null, null, null, null);

    constructor(private UserAuthenticationService: UserAuthenticationService) { }

    registerUser() {

        // const name = "Manolis";
        // const email = "manioannides@gmail.com";
        // const password = "obafemi9";
        this.currentUser.name = (<HTMLInputElement>document.getElementById("argName")).value;
        this.currentUser.email = (<HTMLInputElement>document.getElementById("argEmail")).value;
        const password = (<HTMLInputElement>document.getElementById("argPass")).value;

        this.UserAuthenticationService.register(this.currentUser.email, password);
        console.log("User Registered");

        // this.currentUser.email = email;
        // this.currentUser.name = name;

        this.UserAuthenticationService.addUser(this.currentUser);

    }

    loginUser() {

        const email = "manolis@alumni.ubc.ca";
        const password = "password";

        this.UserAuthenticationService.login(email, password);
        console.log("User Authenticated");

    }

}