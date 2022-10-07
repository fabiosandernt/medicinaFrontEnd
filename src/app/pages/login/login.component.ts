import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { IJWT } from 'src/app/shared/models/jwt';
import { Usuario } from 'src/app/shared/models/usuario';
import { JWTService } from 'src/app/shared/services/jwtToken.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { AuthService } from '../../shared/services/auth.service';
import { LoginService } from '../../shared/services/login.service';
import { ComponenteCriarEmpresa } from '../empresa/criar-empresa/criar-empresa.component';
import { ComponenteListarEmpresa } from '../empresa/listar-empresa/listar-empresa.component';

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
        private toastr: ToastrService,
        private userService: UsuarioService
    ) {}

    ngOnInit() {
        if(this.jwtService.hasToken) this.jwtService.removeToken

        this.form = this._formbuilder.group({
            email: [''],
            senha: ['']
        })

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        // var navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        // var navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.remove('navbar-transparent');
    }

    reloadPage(): void {
        window.location.reload();
    }

    showAlert(type: string) {
        const from = 'top'
        const align = 'right'

        if(type == 'error') {
            this.toastr.error('<span class="now-ui-icons tim-icons icon-alert-circle-exc"></span> Não foi possível fazer login </b> - Email ou senha incorretos!', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
            });
        }

        if(type == 'success') {
            this.toastr.success('<span class="now-ui-icons ui-1_check"></span> Login bem sucedido </b> - Bem-vindo(a)!', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
            });
        }
    }

    login() {
        if(this.form.invalid) return;

        const formData = { ...this.form.value };

        const loginData: any = {
            email: formData.email,
            password: formData.senha
        }

        // this.authService.login(loginData).subscribe((data: any) => {
        //     if(data) this._router.navigate(['/empresa/listar'])
        //     else this.showAlert()
        // })

        // this.loginService.Login({...this.form.value})
        //     .subscribe(result => {
        //         this.userAuthService.saveToken(result.data);
        //         this.router.navigate(['dashboard']);
        //     },
        //     err => {
        //         console.log(err);
        //         alert("Deu erro no login");
        //     }
        // );

        this.loginService.Login(loginData).subscribe({
            next: (result) => {
                this.authService.saveToken(result);
                this.showAlert('success')
                this._router.navigate(['']);
            },
            error: (err) => {
                console.log(err)
                this.showAlert('error')
            },
        });

        // return this.loginService.Login(loginData).subscribe({
        //     next: (result) => {
        //         // const token: IJWT = result as IJWT;
        //         this.jwtService.setToken(result);
        //         this.authService.authenticatedUser()

        //         this._router.navigate(['/empresa/listar'])

        //         return true;
        //     },
        //     error: (err) => {
        //         console.log(err.error.message)
        //         this.showAlert();
        //         return false;
        //     },
        // })
    };
}
