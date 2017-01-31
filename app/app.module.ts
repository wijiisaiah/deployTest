// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './users/user.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

//Components
import { AppComponent } from './app.component';
import {MapComponent} from "./map/map.component";

@NgModule({
    imports: [ 
        BrowserModule,
        UserModule,
        AppRoutingModule,
        CoreModule.forRoot()
    ],
    declarations: [
        AppComponent,
        MapComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }