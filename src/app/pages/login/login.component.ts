import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

    constructor(private _router: Router, private _formbuilder: FormBuilder, private _loginService: LoginService) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.initForm()
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    initForm() {
        this.form = this._formbuilder.group({
            email: [null],
            senha: [null]
        })
    }

    login() {
        if(this.form.invalid) return;

        return this._router.navigate(['/empresa/listar']);

        // this._loginService.Login({...this.form.value})
        //     .subscribe((result: any) => {
        //         this.userAuthService.saveToken(result.data);
        //     },
        //     (err: any) => {
        //         console.log(err);
        //         alert("Deu erro no login");
        //     });
    }
}
