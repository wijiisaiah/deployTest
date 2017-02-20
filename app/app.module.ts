// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

//Components
import { AppComponent } from './app.component';
import { MenuComponent } from "./menu/menu.component";
import { UserAccountComponent } from "./users/user-account/user-account.component";
import { MapComponent } from "./map/map.component";
import { UserAuthenticationComponent } from "./users/user-authentication/user-authentication.component";
import { MyBookingsComponent } from "./bookings/my-bookings/my-bookings.component";

//Services
import { UserService } from "./shared/services/user.service";
import { BookingService } from "./shared/services/booking.service";
import { ParkingService } from "./shared/services/parkingStation.service";
import { AuthGuard } from "./shared/services/auth.guard";
import {MenuService} from "./shared/services/menu.service";
import {EmailService} from "./shared/services/email.service";
import {PaymentService} from "./shared/services/payment.service";
import {CurrentBookingComponent} from "./bookings/currentBooking.component";

@NgModule({
    imports: [ 
        BrowserModule,
        AppRoutingModule,
        CoreModule.forRoot()
    ],
    declarations: [
        AppComponent,
        MapComponent,
        MenuComponent,
        UserAuthenticationComponent,
        UserAccountComponent,
        MyBookingsComponent,
        CurrentBookingComponent
    ],
    providers:[ UserService, BookingService, ParkingService, AuthGuard, MenuService, EmailService, PaymentService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }