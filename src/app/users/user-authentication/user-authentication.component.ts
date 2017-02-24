import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/services/user.service';
import { EmailService } from '../../shared/services/email.service';

import { User } from '../../shared/model/user';
import { Router } from "@angular/router";
import { userInfo } from "os";
declare let $: any;

@Component({
    moduleId: module.id,
    selector: 'user-authentication',
    templateUrl: 'user-authentication.component.html',
    styleUrls: ['user-authentication.component.css']
})
export class UserAuthenticationComponent implements OnInit {

    private user: User = new User(null, null, null, null, null);

    constructor(private userService: UserService, private emailService: EmailService,
        private router: Router) {
    }

    ngOnInit() {


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


    }

    register() {
        let that = this;
        document.getElementById('loader').style.display = 'block';
        this.user.name = (<HTMLInputElement>document.getElementById('RegisterName')).value;
        this.user.email = (<HTMLInputElement>document.getElementById('RegisterEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('RegisterPass')).value;
        const confirmPassword = (<HTMLInputElement>document.getElementById('ConfirmPass')).value;

        if (this.isMatchingPassword(password, confirmPassword)) {
            this.userService.register(this.user.name, this.user.email, password)
                .then(() => {
                    // document.getElementById('loader').style.display = 'none';
                    $('#login-modal').modal('toggle');
                    that.router.navigate(['/map']);
                    this.emailService.createEmail(EmailService.REGISTRATION_CONFIRMATION, this.user.email)
                })
                .catch((err) => {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('form-wrapper').style.display = 'block';
                    document.getElementById('login-modal').setAttribute("aria-hidden","false");
                    document.getElementById('login-modal').setAttribute("display","block");
                    alert(err);
                });
            console.log("User Registered");

        } else {
            alert('Passwords Must Match');
        }

    }

    login() {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('form-wrapper').style.display = 'none';
        let that = this;

        const email = (<HTMLInputElement>document.getElementById('LoginEmail')).value;
        const password = (<HTMLInputElement>document.getElementById('LoginPass')).value;

        this.userService.login(email, password)
            .then(() => {
                // document.getElementById('loader').style.display = 'none';
                $('#login-modal').modal('toggle');
                that.router.navigate(['/map']);
            })
            .catch((err => {
                document.getElementById('loader').style.display = 'none';
                $('#login-modal').modal('toggle');
                alert(err);
            }));

        console.log("User Authenticated");
    }

    forgotPassword(){
        const email = (<HTMLInputElement>document.getElementById('forgotPasswordEmail')).value;
        $('#login-modal').modal('toggle');
        this.userService.forgotPassword(email);
    }

    reRoute() {
        document.getElementById('login-modal').setAttribute('aria-hidden', 'true');
        this.router.navigate(['/map']);
    }

    isMatchingPassword(password: string, confirmPass: string) {
        return password === confirmPass;
    }

}