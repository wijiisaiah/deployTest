// Modules
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

// Components
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { UserAccountComponent } from './user-account/user-account.component';

// Services
import { UserAuthenticationService } from './services/user-authentication.service';

@NgModule({
    imports: [ 
        UserRoutingModule 
        ],
    declarations: [
        UserAuthenticationComponent,
        UserAccountComponent
    ],
    exports: [],
    providers: [
        UserAuthenticationService
    ]
})
export class UserModule { }