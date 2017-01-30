import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
            { path: 'login', component: UserLoginComponent },
            { path: '**', redirectTo: 'login' }
        ])
    ],
    exports: [ RouterModule ]
})
export class UserRoutingModule { }