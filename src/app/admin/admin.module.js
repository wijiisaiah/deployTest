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
// Modules
var core_1 = require('@angular/core');
var admin_routing_module_1 = require('./admin-routing.module');
var forms_1 = require('@angular/forms');
// Component
var user_list_component_1 = require('./admin-users/user-list/user-list.component');
var user_detail_component_1 = require('./admin-users/user-detail/user-detail.component');
var email_list_component_1 = require('./admin-email/email-list/email-list.component');
var email_detail_component_1 = require('./admin-email/email-detail/email-detail.component');
var parking_list_component_1 = require('./admin-parking/parking-list/parking-list.component');
var parking_detail_component_1 = require('./admin-parking/parking-detail/parking-detail.component');
//Service
var admin_user_service_1 = require("./shared/service/admin-user.service");
var admin_parking_service_1 = require("./shared/service/admin-parking.service");
var admin_email_service_1 = require("./shared/service/admin-email.service");
var admin_component_1 = require("./admin.component");
var navbar_component_1 = require("./navbar/navbar.component");
var core_module_1 = require("../core/core.module");
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                admin_routing_module_1.AdminRoutingModule,
                forms_1.ReactiveFormsModule,
                core_module_1.CoreModule.forRoot()
            ],
            declarations: [
                parking_detail_component_1.AdminParkingDetailComponent,
                parking_list_component_1.AdminParkingListComponent,
                email_detail_component_1.AdminEmailDetailComponent,
                email_list_component_1.AdminEmailListComponent,
                user_detail_component_1.AdminUserDetailComponent,
                user_list_component_1.AdminUserListComponent,
                admin_component_1.AdminComponent,
                navbar_component_1.NavbarComponent
            ],
            exports: [
                admin_routing_module_1.AdminRoutingModule,
                admin_component_1.AdminComponent
            ],
            providers: [
                admin_parking_service_1.AdminParkingService,
                admin_user_service_1.AdminUserService,
                admin_email_service_1.AdminEmailService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map