import { Component } from '@angular/core';

import { UserAuthenticationService } from '../services/user-authentication.service';

import { User } from '../model/user';
import {Router} from "@angular/router";
import {userInfo} from "os";

@Component({
    moduleId: module.id,
    selector: 'user-authentication',
    templateUrl: 'user-authentication.component.html',
    styleUrls: ['user-authentication.component.css']
})
export class UserAuthenticationComponent {

    private user: User = new User(null, null, null, null, null);
    constructor(
        private UserAuthenticationService: UserAuthenticationService,
        private router: Router
    ) { }

    register() {

        this.user.name = (<HTMLInputElement>document.getElementById('argName')).value;
        this.user.email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('argPass')).value;

        this.UserAuthenticationService.register(this.user.name, this.user.email, password);

        console.log("User Registered");

    }

    login() {

        const email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('argPass')).value;

        this.UserAuthenticationService.login(email, password);
        console.log("User Authenticated");


    }

    reRoute(){
        let attr = document.getElementById('login-modal').setAttribute('aria-hidden', 'true');
        this.router.navigate(['/map'])
    }



}