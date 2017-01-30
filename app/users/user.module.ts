// Modules
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

// Components
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
    imports: [ 
        UserRoutingModule 
        ],
    declarations: [
        UserLoginComponent
    ],
    exports: [],
    providers: []
})
export class UserModule { }