import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
require('firebase/database');
// require('firebase/authentication');

import { FIREBASE_CONFIG } from '../constant/constants';

@Injectable()
export class FirebaseConfigService {

    private _database: firebase.database.Database;
    // private _auth: firebase.auth.Auth;

    constructor() {
        this.configureApp();
        this.configureDatabase();
        // this.configureAuth();
    }

    public get database() {
        return this._database;
    }

    // public get auth() {
    //     return this._auth;
    // }

    configureApp() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    configureDatabase() {
        this._database = firebase.database();
    }
    
    // configureAuth() {
    //     this._auth = firebase.auth();
    // }
}