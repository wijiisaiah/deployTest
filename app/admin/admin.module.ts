// Modules
import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

// Component
import {AdminUserListComponent} from './admin-users/user-list/user-list.component';
import {AdminUserDetailComponent} from './admin-users/user-detail/user-detail.component';
import {AdminEmailListComponent} from './admin-email/email-list/email-list.component';
import {AdminEmailDetailComponent} from './admin-email/email-detail/email-detail.component';
import {AdminParkingListComponent} from './admin-parking/parking-list/parking-list.component';
import {AdminParkingDetailComponent} from './admin-parking/parking-detail/parking-detail.component';

//Service
import {AdminUserService} from "./shared/service/admin-user.service";
import {AdminParkingService} from "./shared/service/admin-parking.service";
import {AdminEmailService} from "./shared/service/admin-email.service";
import {AdminComponent} from "./admin.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {CoreModule} from "../core/core.module";

@NgModule({
    imports: [
        AdminRoutingModule,
        ReactiveFormsModule,
        CoreModule.forRoot()
    ],
    declarations: [
        AdminParkingDetailComponent,
        AdminParkingListComponent,
        AdminEmailDetailComponent,
        AdminEmailListComponent,
        AdminUserDetailComponent,
        AdminUserListComponent,
        AdminComponent,
        NavbarComponent
    ],
    exports: [
        AdminRoutingModule,
        AdminComponent
    ],
    providers: [
        AdminParkingService,
        AdminUserService,
        AdminEmailService
    ]
})
export class AdminModule {
}