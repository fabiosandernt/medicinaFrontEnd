import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { JWTService } from 'src/app/shared/services/jwtToken.service';
import { ToastrNotificationService } from 'src/app/shared/services/toastr-notification.service';
import { AuthService } from '../../shared/services/auth.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class ComponenteLogin implements OnInit {

    data : Date = new Date();
    focus: any;
    focus1: any;

    form: FormGroup;

    onAlert: boolean = false;

    constructor(
        private _router: Router,
        private _formbuilder: FormBuilder,
        private loginService: LoginService,
        private authService: AuthService,
        private jwtService: JWTService,
        private toastr: ToastrNotificationService
    ) {}

    ngOnInit() {
        if(this.jwtService.hasToken) this.jwtService.removeToken

        this.form = this._formbuilder.group({
            email: [''],
            senha: ['']
        })

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
    }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }

    reloadPage(): void {
        window.location.reload();
    }

    login() {
        if(this.form.invalid) return;

        const formData = { ...this.form.value };

        const loginData: any = {
            email: formData.email,
            password: formData.senha
        }

        this.loginService.Login(loginData).subscribe({
            next: (result) => {
                this.authService.login(result)

                this.toastr.successLogin()
                return this._router.navigate(['']);
            },
            error: (err) => {
                console.log("ErrorLogin:", err)
                this.toastr.errorLogin()
            },
        });
    };
}
