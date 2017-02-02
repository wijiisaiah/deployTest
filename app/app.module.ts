// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './users/user.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import {MapModule} from "./map/map.module";

//Components
import { AppComponent } from './app.component';
import {MenuComponent} from "./menu/menu.component";
import {UserAccountComponent} from "./users/user-account/user-account.component";
@NgModule({
    imports: [ 
        BrowserModule,
        UserModule,
        MapModule,
        AppRoutingModule,
        CoreModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }