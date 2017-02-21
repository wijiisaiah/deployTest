"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var payment_service_1 = require('./../../shared/services/payment.service');
var constants_1 = require('./../../core/constant/constants');
var stripe = Stripe(constants_1.TEST_PUBLISHABLE_KEY);
var elements = stripe.elements();
var UserBillingComponent = (function () {
    function UserBillingComponent(paymentService) {
        this.paymentService = paymentService;
    }
    UserBillingComponent.prototype.ngOnInit = function () {
        this.billing();
    };
    UserBillingComponent.prototype.billing = function () {
        var that = this;
        // Custom styling can be passed to options when creating an Element.
        var style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '16px',
                lineHeight: '24px'
            }
        };
        // Create an instance of the card Element
        var card = elements.create('card', { style: style });
        // Add an instance of the card Element into the `card-element` <div>
        card.mount('#card-element');
        card.addEventListener('change', function (event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            }
            else {
                displayError.textContent = '';
            }
        });
        // Create a token or display an error the form is submitted.
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            stripe.createToken(card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                }
                else {
                    // Send the token to your server
                    stripeTokenHandler(result.token);
                }
            });
        });
        function stripeTokenHandler(token) {
            // Insert the token ID into the form so it gets submitted to the server
            var form = document.getElementById('payment-form');
            var hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeToken');
            hiddenInput.setAttribute('value', token.id);
            form.appendChild(hiddenInput);
            console.log(hiddenInput);
            that.paymentService.createCustomer(token);
            // Submit the form
            form.submit();
        }
    };
    UserBillingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-billing',
            templateUrl: 'user-billing.component.html',
            styleUrls: ['user-billing.component.css'],
        }), 
        __metadata('design:paramtypes', [payment_service_1.PaymentService])
    ], UserBillingComponent);
    return UserBillingComponent;
}());
exports.UserBillingComponent = UserBillingComponent;
//# sourceMappingURL=user-billing.component.js.map