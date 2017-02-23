import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../shared/services/user.service';

import { User } from '../../shared/model/user';
import { Subscription } from "rxjs";
declare let $:any;

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
        for (let subs of this.subscriptions) {
            subs.unsubscribe();
        }
    }

    ngOnInit() {
        this.getCurrentUser();

        $('#account-link').click(function (e) {
            $("#account-form").delay(100).fadeIn(100);
            $("#security-form").fadeOut(100);
            $('#security-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#security-link').click(function (e) {
            $("#security-form").delay(100).fadeIn(100);
            $("#account-form").fadeOut(100);
            $('#account-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
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

    editInfo() {
        console.log("Editediteditediteditediteditediteditediteditedit");
        (<HTMLInputElement>document.getElementById('argName')).readOnly = false;
        (<HTMLInputElement>document.getElementById('argEmail')).readOnly = false;
        (<HTMLInputElement>document.getElementById('argAddress')).readOnly = false;
        (<HTMLInputElement>document.getElementById('updateButton')).hidden = false;
        (<HTMLInputElement>document.getElementById('editButton')).hidden = true;
    }

    updateUser() {

        this.currentUser.name = (<HTMLInputElement>document.getElementById('argName')).value;
        this.currentUser.email = (<HTMLInputElement>document.getElementById('argEmail')).value;
        this.currentUser.address = (<HTMLInputElement>document.getElementById('argAddress')).value;

        this.uas.updateUser(this.currentUser);

        (<HTMLInputElement>document.getElementById('argName')).readOnly = true;
        (<HTMLInputElement>document.getElementById('argEmail')).readOnly = true;
        (<HTMLInputElement>document.getElementById('argAddress')).readOnly = true;
        (<HTMLInputElement>document.getElementById('updateButton')).hidden = true;
        (<HTMLInputElement>document.getElementById('editButton')).hidden = false;
    }

}