import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {MapComponent} from "../map/map.component";

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
            { path: 'login', component: UserAuthenticationComponent },
            { path: 'account', component: UserAccountComponent },
            { path: 'map', component: MapComponent},
            { path: '**', redirectTo: 'login' }
        ])
    ],
    exports: [ RouterModule ]
})
export class UserRoutingModule { }