import { UserBillingComponent } from './users/user-billing/user-billing.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from "./map/map.component";
import { UserAccountComponent } from "./users/user-account/user-account.component";
import { UserAuthenticationComponent } from "./users/user-authentication/user-authentication.component";
import { MyBookingsComponent } from "./bookings/my-bookings/my-bookings.component";
import {AuthGuard} from "./shared/services/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
            { path: 'login', component: UserAuthenticationComponent },
            { path: 'account', component: UserAccountComponent },
            { path: 'map', component: MapComponent, canActivate: [AuthGuard]},
            { path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard]},
            { path: 'billing', component: UserBillingComponent, canActivate: [AuthGuard]},
            { path: '**', redirectTo: 'login' }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }