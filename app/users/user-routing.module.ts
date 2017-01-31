import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
            { path: 'login', component: UserAuthenticationComponent },
            { path: '**', redirectTo: 'login' }
        ])
    ],
    exports: [ RouterModule ]
})
export class UserRoutingModule { }