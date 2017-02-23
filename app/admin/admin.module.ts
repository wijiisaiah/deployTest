// Modules
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Component
import { AdminUserListComponent } from './users-admin/user-list/user-list.component';
import { AdminUserDetailComponent } from './users-admin/user-detail/user-detail.component';
import { AdminEmailListComponent } from './email-admin/email-list/email-list.component';
import { AdminEmailDetailComponent } from './email-admin/email-detail/email-detail.component';
import { AdminParkingListComponent } from './parking-admin/parking-list/parking-list.component';
import { AdminParkingDetailComponent } from './parking-admin/parking-detail/parking-detail.component';

//Service
import {AdminUserService} from "./shared/service/admin-user.service";
import {AdminParkingService} from "./shared/service/admin-parking.service";
import {AdminEmailService} from "./shared/service/admin-email.service";

@NgModule ({
    imports: [
        AdminRoutingModule,
        ReactiveFormsModule
     ],
    declarations: [
       AdminParkingDetailComponent,
       AdminParkingListComponent,
       AdminEmailDetailComponent,
       AdminEmailListComponent,
       AdminUserDetailComponent,
       AdminUserListComponent
     ],
    exports: [ ],
    providers: [ 
        AdminParkingService,
        AdminUserService,
        AdminEmailService
         ]
})
export class AdminModule { }