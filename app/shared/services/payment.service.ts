import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { FirebaseConfigService } from '../../core/service/firebase-config.service';
import { User } from '../model/user';
import { Booking } from "../model/booking";



@Injectable()
export class PaymentService {

    openCheckout() {
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
            locale: 'auto',
            token: function (token: any) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
            }
        });

    }
}