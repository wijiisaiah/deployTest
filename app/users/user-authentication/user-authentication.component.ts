import { Component } from '@angular/core';

import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
    moduleId: module.id,
    selector: 'user-authentication',
    templateUrl: 'user-authentication.component.html',
    styleUrls: ['user-authentication.component.css']
})
export class UserAuthenticationComponent {

    constructor(private UserAuthenticationService: UserAuthenticationService) { }

    register() {
        
        const email = "man@mazdis.com";
        const password = "password";

        this.UserAuthenticationService.register(email, password);
        console.log("User Registered");
    }

    login() {

        const email = "manolis@alumni.ubc.ca";
        const password = "password";

        this.UserAuthenticationService.login(email, password);
        console.log("User Authenticated");

    }

}