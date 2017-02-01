import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {FirebaseConfigService} from '../../core/service/firebase-config.service';

import {User} from '../model/user';

@Injectable()
export class UserAuthenticationService {

    private authRef = this.fire.auth;
    private databaseRef = this.fire.database.ref('/users');
    public currentUser = this.fire.auth.currentUser;

    constructor(private fire: FirebaseConfigService) {
    }

    register(name: string, email: string, password: string) {
        let that = this;
        let temp: User = new User(name, null, email, null, null )

        this.authRef.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                user.updateProfile({
                    displayName: name,
                    photoURL: ""
                });
                temp.uid = user.uid;
                that.addUser(temp);
                console.log(user);
            })
            .catch(function (err) {
                console.error("Registration Error", err);
            });



    }

    login(email: string, password: string) {
        let that = this;

        this.authRef.signInWithEmailAndPassword(email, password)
            .then(function(user){
                that.currentUser = user;
                console.log(that.currentUser)
            })
            .catch(function (err) {
                console.error("Login Error", err);
            });

    }
    signOut(){
        this.authRef.signOut();
        console.log('signed out')
    }

    addUser(user: User) {

        const newUserRef = this.databaseRef.push(user.uid);
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


}