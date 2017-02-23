import { UserBillingComponent } from './users/user-billing/user-billing.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from "./map/map.component";
import { UserAccountComponent } from "./users/user-account/user-account.component";
import { UserAuthenticationComponent } from "./users/user-authentication/user-authentication.component";
import { MyBookingsComponent } from "./bookings/my-bookings/my-bookings.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {AdminComponent} from "./admin/admin.component";
import {AdminParkingListComponent} from "./admin/admin-parking/parking-list/parking-list.component";
import {AdminUserListComponent} from "./admin/admin-users/user-list/user-list.component";
import {AdminEmailListComponent} from "./admin/admin-email/email-list/email-list.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
            { path: 'login', component: UserAuthenticationComponent },
            { path: 'account', component: UserAccountComponent },
            { path: 'map', component: MapComponent, canActivate: [AuthGuard]},
            { path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard]},
            { path: 'billing', component: UserBillingComponent, canActivate: [AuthGuard]},
            { path: 'admin', component: AdminComponent,
                children: [
                    { path: '', redirectTo: 'parking', pathMatch: 'prefix' },
                    { path: 'parking', component: AdminParkingListComponent },
                    { path: 'user', component: AdminUserListComponent },
                    { path: 'email', component: AdminEmailListComponent },
                    { path: '**', redirectTo: '' }
                ]},
            { path: '**', redirectTo: 'login' }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }