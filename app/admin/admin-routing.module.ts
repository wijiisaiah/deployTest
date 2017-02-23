import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AdminParkingListComponent} from "./admin-parking/parking-list/parking-list.component";
import {AdminUserListComponent} from "./admin-users/user-list/user-list.component";
import {AdminEmailListComponent} from "./admin-email/email-list/email-list.component";

@NgModule({
    imports: [ 
        RouterModule.forChild([
        ])
    ],
    exports: [ RouterModule ]
})
export class AdminRoutingModule { }