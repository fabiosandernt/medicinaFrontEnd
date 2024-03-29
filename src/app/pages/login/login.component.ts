import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario';
import { JWTService } from 'src/app/shared/services/jwtToken.service';
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
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.form = this._formbuilder.group({
            email: [''],
            senha: ['']
        })

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    reloadPage(): void {
        window.location.reload();
    }

    showAlert() {
        const from = 'top'
        const align = 'right'

        this.toastr.error('<span class="now-ui-icons tim-icons icon-alert-circle-exc"></span> Não foi possível fazer login </b> - Email ou senha incorretos!', '', {
            timeOut: 8000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-' + from + '-' +  align
        });
        // this.toastr.warning('<span class="now-ui-icons tim-icons icon-alert-circle-exc"></span> Ocorreu um erro inesperado </b> - Por favor, tente novamente mais tarde!', '', {
        //     timeOut: 8000,
        //     closeButton: true,
        //     enableHtml: true,
        //     toastClass: "alert alert-warning alert-with-icon",
        //     positionClass: 'toast-' + from + '-' +  align
        // });
    }

    login() {
        if(this.form.invalid) return;

        const formData = { ...this.form.value };

        const loginData: any = {
            email: formData.email,
            password: formData.senha
        }

        this.authService.login(loginData).subscribe((data: any) => {
            if(data) this._router.navigate(['/empresa/listar'])
            else this.showAlert()
        })
    };
}
