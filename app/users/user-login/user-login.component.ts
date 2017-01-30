import { Component } from '@angular/core';

import { UserLoginService } from '../services/user-login.service';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'user-login.component.html',
    styleUrls: ['user-login.component.css']
})
export class UserLoginComponent {

    constructor(private userLoginService: UserLoginService) { }

    authenticateUser() {
        const email = "manioannides@gmai.com";
        const password = "password";
        
        this.userLoginService.authenticateUser(email, password)
           
                console.log("User Authenticated")
            
    }
}