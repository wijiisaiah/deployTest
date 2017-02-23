import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../shared/services/user.service';
import { PaymentService } from './../../shared/services/payment.service';

import { TEST_SECRET_KEY, TEST_PUBLISHABLE_KEY } from './../../core/constant/constants';

import { User } from '../../shared/model/user';
import { Subscription } from "rxjs";

declare let Stripe: any;
let stripe = Stripe(TEST_PUBLISHABLE_KEY);
let elements = stripe.elements();

@Component({
    moduleId: module.id,
    selector: 'user-billing',
    templateUrl: 'user-billing.component.html',
    styleUrls: ['user-billing.component.css'],
})
export class UserBillingComponent implements OnInit {

    constructor(private paymentService: PaymentService) { }

    ngOnInit() {
        this.billing();
    }

    billing() {

        let that = this;
        // Custom styling can be passed to options when creating an Element.
        let style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '16px',
                lineHeight: '24px'
            }
        };

        // Create an instance of the card Element
        let card = elements.create('card', { style: style });

        // Add an instance of the card Element into the `card-element` <div>
        card.mount('#card-element');

        card.addEventListener('change', function (event) {
            let displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        // Create a token or display an error the form is submitted.
        let form = document.getElementById('payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            stripe.createToken(card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error
                    let errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server
                    that.stripeTokenHandler(result.token);
                }
            });
        });

    }
    
    stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        let form = <HTMLFormElement>document.getElementById('payment-form');
  
        this.paymentService.createCustomer(token);

        // Submit the form
        form.submit();

    }

}




