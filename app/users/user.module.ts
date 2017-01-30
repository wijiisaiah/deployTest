// Modules
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

// Components
import { UserLoginComponent } from './user-login/user-login.component';

// Services
import { UserLoginService } from './services/user-login.service';

@NgModule({
    imports: [ 
        UserRoutingModule 
        ],
    declarations: [
        UserLoginComponent
    ],
    exports: [],
    providers: [
        UserLoginService
    ]
})
export class UserModule { }