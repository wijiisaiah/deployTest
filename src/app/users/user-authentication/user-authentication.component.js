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
var user_service_1 = require('../../shared/services/user.service');
var email_service_1 = require('../../shared/services/email.service');
var user_1 = require('../../shared/model/user');
var router_1 = require("@angular/router");
var UserAuthenticationComponent = (function () {
    function UserAuthenticationComponent(userService, emailService, router) {
        this.userService = userService;
        this.emailService = emailService;
        this.router = router;
        this.user = new user_1.User(null, null, null, null, null);
    }
    UserAuthenticationComponent.prototype.ngOnInit = function () {
        $('#login-form-link').click(function (e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $("#forgotPassword-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $("#login-help").delay(100).fadeIn(100);
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').click(function (e) {
            $("#register-form").delay(100).fadeIn(100);
            $("#forgotPassword-form").fadeOut(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $("#login-help").fadeOut(100);
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#forgotPassword-form-link').click(function (e) {
            $("#forgotPassword-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
    };
    UserAuthenticationComponent.prototype.register = function () {
        var _this = this;
        var that = this;
        document.getElementById('loader').style.display = 'block';
        this.user.name = document.getElementById('RegisterName').value;
        this.user.email = document.getElementById('RegisterEmail').value;
        var password = document.getElementById('RegisterPass').value;
        var confirmPassword = document.getElementById('ConfirmPass').value;
        if (this.isMatchingPassword(password, confirmPassword)) {
            this.userService.register(this.user.name, this.user.email, password)
                .then(function () {
                // document.getElementById('loader').style.display = 'none';
                $('#login-modal').modal('toggle');
                that.router.navigate(['/map']);
                _this.emailService.createEmail(email_service_1.EmailService.REGISTRATION_CONFIRMATION, _this.user.email);
            })
                .catch(function (err) {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('form-wrapper').style.display = 'block';
                document.getElementById('login-modal').setAttribute("aria-hidden", "false");
                document.getElementById('login-modal').setAttribute("display", "block");
                alert(err);
            });
            console.log("User Registered");
        }
        else {
            alert('Passwords Must Match');
        }
    };
    UserAuthenticationComponent.prototype.login = function () {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('form-wrapper').style.display = 'none';
        var that = this;
        var email = document.getElementById('LoginEmail').value;
        var password = document.getElementById('LoginPass').value;
        this.userService.login(email, password)
            .then(function () {
            // document.getElementById('loader').style.display = 'none';
            $('#login-modal').modal('toggle');
            that.router.navigate(['/map']);
        })
            .catch((function (err) {
            document.getElementById('loader').style.display = 'none';
            $('#login-modal').modal('toggle');
            alert(err);
        }));
        console.log("User Authenticated");
    };
    UserAuthenticationComponent.prototype.forgotPassword = function () {
        var email = document.getElementById('forgotPasswordEmail').value;
        $('#login-modal').modal('toggle');
        this.userService.forgotPassword(email);
    };
    UserAuthenticationComponent.prototype.reRoute = function () {
        document.getElementById('login-modal').setAttribute('aria-hidden', 'true');
        this.router.navigate(['/map']);
    };
    UserAuthenticationComponent.prototype.isMatchingPassword = function (password, confirmPass) {
        return password === confirmPass;
    };
    UserAuthenticationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-authentication',
            templateUrl: 'user-authentication.component.html',
            styleUrls: ['user-authentication.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, email_service_1.EmailService, router_1.Router])
    ], UserAuthenticationComponent);
    return UserAuthenticationComponent;
}());
exports.UserAuthenticationComponent = UserAuthenticationComponent;
//# sourceMappingURL=user-authentication.component.js.map