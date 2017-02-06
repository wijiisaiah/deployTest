import { Component } from '@angular/core';

import { UserService } from '../../shared/services/user.service';

import { User } from '../../shared/model/user';
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
        private userService: UserService,
        private router: Router
    ) { }

    register() {
        let that = this;
        this.user.name = (<HTMLInputElement>document.getElementById('argName')).value;
        this.user.email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('argPass')).value;

        this.userService.register(this.user.name, this.user.email, password);

        console.log("User Registered");

    }

    login() {
        let that = this;
        const email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('argPass')).value;

        this.userService.login(email, password)
            .then(()=> {

            })
            .catch((err => {
                alert('Login Failed');
            }));
        console.log("User Authenticated");

    }

    reRoute(){
        document.getElementById('login-modal').setAttribute('aria-hidden', 'true');
        this.router.navigate(['/map'])
    }



}