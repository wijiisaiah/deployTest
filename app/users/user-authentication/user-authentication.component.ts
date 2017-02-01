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


    private user: User = new User(null, null, null, null);
    constructor(private UserAuthenticationService: UserAuthenticationService) { }

    register() {
        // const name = "Manolis";
        // const email = "manolis@alumni.ubc.ca";
        // const password = "password";
        this.user.name = (<HTMLInputElement>document.getElementById('argName')).value;
        this.user.email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('argPass')).value;

        this.UserAuthenticationService.register(this.user.name, this.user.email, password);

        console.log("User Registered");

        this.UserAuthenticationService.addUser( this.user );

    }

    loginUser() {

        const email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('argPass')).value;

        this.UserAuthenticationService.login(email, password);
        console.log("User Authenticated");

    }



}