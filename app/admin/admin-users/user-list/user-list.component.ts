import { Component, OnInit } from '@angular/core';

import { AdminUserService } from './../../shared/service/admin-user.service';

import { User } from './../../../shared/model/user';

@Component({
    moduleId: module.id,
    selector: 'user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class AdminUserListComponent implements OnInit { 

    private users: User[] = [];

    constructor(private aus: AdminUserService ) { }

    ngOnInit() {
        this.getAddedUsers();
        this.getUpdatedUsers();
    }

    getAddedUsers() {
        this.aus.getAddedUsers()
        .subscribe(user => {
            this.users.push(user);
        },
        err => {
            console.error("Unable to get added user - ", err);
        });
    }

    getUpdatedUsers() {
        this.aus.getUpdatedUsers()
        .subscribe(updatedUser => {
            const userIndex = this.users.map(index => index.uid).indexOf(updatedUser['uid']);
            this.users[userIndex] = updatedUser;
        },
        err => {
            console.log("Unable to get updated user - ", err);
        });
    }

}