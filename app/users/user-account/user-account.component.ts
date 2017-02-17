import {Component, OnInit, OnDestroy} from '@angular/core';

import { UserService } from '../../shared/services/user.service';

import { User } from '../../shared/model/user';
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'user-account',
    templateUrl: 'user-account.component.html',
    styleUrls: ['user-account.component.css']

})
export class UserAccountComponent implements OnInit, OnDestroy {

    private currentUser = new User(null, null, null, null, null);
    private subscriptions: Subscription[] = [];

    constructor(private uas: UserService) { }


    ngOnDestroy() {
        for(let subs of this.subscriptions){
            subs.unsubscribe();
        }
    }

    ngOnInit() {
        this.getCurrentUser();
    }

     getCurrentUser() {
        let temp = this.uas.getCurrentUser()
            .subscribe(user => {
                this.currentUser = user;
                // console.log("Current user - ", this.currentUser);
            },
            err => {
                console.error("Unable to get current user -", err);
            });
        this.subscriptions.push(temp);
    }

    editInfo(){
        (<HTMLInputElement>document.getElementById('argName')).setAttribute('readOnly', 'false');
    }

    updateUser() {

        this.currentUser.name = (<HTMLInputElement>document.getElementById('argName')).value;
        this.currentUser.email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        this.currentUser.address = (<HTMLInputElement>document.getElementById('argAddress')).value;

        this.uas.updateUser(this.currentUser);

        (<HTMLInputElement>document.getElementById('account-form')).setAttribute('readonly', 'false');
    }

}