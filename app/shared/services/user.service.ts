import { Injectable } from '@angular/core';
import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { User } from '../model/user';
import { Subject, Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import {MapComponent} from "../../map/map.component";
import {EmailService} from "./email.service";

@Injectable()
export class UserService {

    private authRef = this.fire.auth;
    private databaseRef = this.fire.database.ref('/users');
    private currentUser = this.fire.auth.currentUser;


    constructor(private fire: FirebaseConfigService, private router: Router) {
        this.currentUser = this.fire.auth.currentUser;
    }

    register(name: string, email: string, password: string) {

        let that = this;
        let temp = new User(name, null, email, null, null);

        return this.authRef.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                temp.uid = user.uid;
                that.addUser(temp);
                that.currentUser = user;
                console.log(user);
            })
            .catch(function (err) {
                console.error("Registration Error", err);
            });

    }

    login(email: string, password: string) {
        let that = this;

        return this.authRef.signInWithEmailAndPassword(email, password)
            .then(function (user) {
                that.currentUser = user;
            })
            .catch(function (err) {
                console.error("Login Error", err);
            });

    }

    signOut() {
        this.authRef.signOut();
        this.currentUser = null;
        this.router.navigate(['/login']);
    }

    addUser(user: User) {

        const newUserRef = this.databaseRef.child(user.uid);
        newUserRef.set({
            name: user.name,
            uid: user.uid,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber
        })

            .catch(err => {
                console.error("Unable to add new user to Db -", err);
            });

    }

    updateUser(user: User) {
        const userRef = this.databaseRef.child(user.uid);
        userRef.update(user);
        this.currentUser.updateEmail(user.email)
        .catch(err => {
            console.log("Unable to update user email (auth) -", err);
        });
    }

    findUserRef(uid: string) {
        return this.databaseRef.child(uid);
    }

    getCurrentUser(): Observable<any> {
        this.currentUser = this.fire.auth.currentUser;
        return Observable.create(obs => {
            if (this.currentUser) {
                const uid = this.currentUser.uid;
                const currentUserRef = this.databaseRef.child(uid);

                currentUserRef.on('value', user => {
                        const newUser = user.val() as User;
                        obs.next(newUser);
                    },
                    err => {
                        obs.throw(err);
                    });

            } else {
                obs.next(undefined);
            }
        });

    }

    isAuthenticated(): boolean {
        let user = this.authRef.currentUser;
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation) {
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => {
                    observer.next(pos);
                }),
                    err => {
                        return Observable.throw(err);
                    }
            });
        } else {
            return Observable.throw("Geolocation not available");
        }
    }
}