import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Usuario } from "../models/usuario";
import { JWTService } from "./jwtToken.service";
import { LocalStorageService } from "./localStorage.service";

import { environment } from 'src/environments/environment.prod';
import jwtDecode from "jwt-decode";
import { IJWT } from "../models/jwt";

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn:'root'
})
export class AuthService {
    // usuarioLogadoSubject = new BehaviorSubject<IJWT | null>(null);
    // //public usuarioAtual: Observable<IJWT>;

    // jwtHelperService: JwtHelperService = new JwtHelperService();

    // constructor(
    //     private http: HttpClient,
    //     private localStorageService: LocalStorageService,
    //     private jwtService: JWTService,
    //     private _router: Router
    // ) {
    //     // this.usuarioAtualSubject = new BehaviorSubject<Usuario>(
    //     //     JSON.parse(this.localStorageService.get('SSID'))
    //     // );

    //     // this.usuarioAtual = this.usuarioAtualSubject.asObservable();
    // }

    // public get isLoggedIn(): IJWT {
    //     return this.usuarioLogadoSubject.value;
    // }

    // login(data: any) {
    //     return this.http.post(`${environment.apiUrl}/Authentication`, data).pipe(
    //     map((result: any) => {
    //         this.jwtService.setToken(result);
    //         //localStorage.setItem('SSID', JSON.stringify(token));

    //         const tokenDecoded = this.jwtService.decodeToken() as IJWT;

    //         this.usuarioLogadoSubject.next(tokenDecoded);
    //         return true;
    //     }),
    //     catchError((error) => {
    //         console.log('CatchError --> ', error);
    //         return of(false);
    //     }))
    // }

    // getTokenAcesso(): string {
    //     var localStorageToken = this.localStorageService.get('SSID');

    //     if (localStorageToken) {
    //         var token = JSON.parse(localStorageToken);

    //         var isTokenExpired = this.jwtService.isTokenExpired();

    //         if (isTokenExpired) {
    //             this.usuarioLogadoSubject.next(null);
    //             return '';
    //         }
    //         var usuarioInfo = this.jwtService.decodeToken() as IJWT;

    //         this.usuarioLogadoSubject.next(usuarioInfo);

    //         return token;
    //     }

    //     return '';
    // }

    constructor(private jwtService: JWTService) {}

    logout() {
        this.jwtService.removeToken();
    }

    isLogged() {
        return this.jwtService.hasToken();
    }

    getUserEmail() {
        return this.jwtService.getTokenEncoded().email;
    }

    getUserSub() {
        return this.jwtService.getTokenEncoded().sub;
    }

    // getUserRole() {
    //     return this.jwtService.getTokenEncoded().role;
    // }

    saveToken(token: string) {
        this.jwtService.setToken(token);
    }

    // logout() {
    //     localStorage.removeItem('SSID');
    //     this.usuarioLogadoSubject.next(null);
    // }
}
