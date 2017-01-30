import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

@Injectable()
export class UserLoginService {

    private authRef = this.fire.auth;

    constructor(private fire: FirebaseConfigService) { }

    authenticateUser(email: string, password: string) {

            this.authRef.createUserWithEmailAndPassword(email, password)
                .catch(function (err) {
                    console.log("Authentication Error", err);
                });

    }

}