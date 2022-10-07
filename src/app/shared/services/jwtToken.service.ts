import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IJWT } from '../models/jwt';
import { LocalStorageService } from './localStorage.service'

const KEY = 'SSID';

@Injectable({
    providedIn:'root'
})
export class JWTService {

    // jwtToken: string;
    // decodedToken: IJWT;

    // constructor(private localStorage: LocalStorageService) {}

    // setToken(token: string): void {
    //     if (token) this.jwtToken = token;

    //     this.localStorage.set('SSID',   JSON.stringify(this.jwtToken));
    // }

    // decodeToken() {
    //     if (this.jwtToken) {
    //         return this.decodedToken = jwt_decode(this.jwtToken);
    //     }
    // }

    // // getName() {
    // //     this.decodeToken();
    // //     return this.decodedToken ? this.decodedToken.name : null;
    // // }

    // // getEmail() {
    // //     this.decodeToken();
    // //     return this.decodedToken ? this.decodedToken.email : null;
    // // }

    // // getTipoUsuario() {
    // //     this.decodeToken();
    // //     return this.decodedToken ? this.decodedToken.tipoUsuario : null;
    // // }

    // getExpiryTime() {
    //     this.decodeToken();
    //     return this.decodedToken ? this.decodedToken.exp : null;
    // }

    // isTokenExpired(): boolean {
    //     const expiryTime: number = Number(this.decodedToken.exp);

    //     if (expiryTime) return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    //     else return false;
    // }

    private tokenModel: IJWT;

    hasToken():boolean {
        return this.getToken() === null ? false : true;
    }

    setToken(token: string) {
        if(this.getToken()) this.removeToken()

        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }

    getTokenEncoded(): IJWT {
        if(this.hasToken()) {
            var tokenDecode = JSON.stringify(jwt_decode(this.getToken() as string) as string);
            this.tokenModel = JSON.parse(tokenDecode) as IJWT;
        }
        return this.tokenModel;
    }

    isTokenExpired(): boolean {
        const expiryTime: number = Number(this.getTokenEncoded().exp);

        if (expiryTime) return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        else return false;
    }
}
