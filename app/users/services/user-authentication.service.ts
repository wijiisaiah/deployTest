import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { User } from '../model/user';

@Injectable()
export class UserAuthenticationService {

    private authRef = this.fire.auth;
    private databaseRef = this.fire.database.ref('/users');;

    constructor(private fire: FirebaseConfigService) { }

    register(email: string, password: string) {

           this.authRef.createUserWithEmailAndPassword(email, password)
                .catch(function (err) {
                    console.error("Registration Error", err);
                });

    }

    login(email: string, password: string) {

        this.authRef.signInWithEmailAndPassword(email, password)
        .catch(function (err) {
            console.error("Login Error", err);
        });
    }

    addUser(user: User) {

        const newUserRef = this.databaseRef.push();
        newUserRef.set({
            name: user.name,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber 
        })
        .catch(err => {
            console.error("Unable to add new user to Db -", err);
        });
        
    }

}