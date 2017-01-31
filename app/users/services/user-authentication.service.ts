import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

@Injectable()
export class UserAuthenticationService {

    private authRef = this.fire.auth;

    constructor(private fire: FirebaseConfigService) { }

    register(email: string, password: string) {

           this.authRef.createUserWithEmailAndPassword(email, password)
                .catch(function (err) {
                    console.log("Registration Error", err);
                });

    }

    login(email: string, password: string) {

        this.authRef.signInWithEmailAndPassword(email, password)
        .catch(function (err) {
            console.log("Login Error", err);
        });
    }

}