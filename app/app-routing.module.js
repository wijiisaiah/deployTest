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
var user_billing_component_1 = require('./users/user-billing/user-billing.component');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var map_component_1 = require("./map/map.component");
var user_account_component_1 = require("./users/user-account/user-account.component");
var user_authentication_component_1 = require("./users/user-authentication/user-authentication.component");
var my_bookings_component_1 = require("./bookings/my-bookings/my-bookings.component");
var auth_guard_1 = require("./shared/services/auth.guard");
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot([
                    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
                    { path: 'login', component: user_authentication_component_1.UserAuthenticationComponent },
                    { path: 'account', component: user_account_component_1.UserAccountComponent },
                    { path: 'map', component: map_component_1.MapComponent, canActivate: [auth_guard_1.AuthGuard] },
                    { path: 'my-bookings', component: my_bookings_component_1.MyBookingsComponent, canActivate: [auth_guard_1.AuthGuard] },
                    { path: 'billing', component: user_billing_component_1.UserBillingComponent, canActivate: [auth_guard_1.AuthGuard] },
                    { path: '**', redirectTo: 'login' }
                ])
            ],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map