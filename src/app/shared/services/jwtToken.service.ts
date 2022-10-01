import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JWTService {

    jwtToken: string;
    decodedToken: { [key: string]: string };

    constructor() {}

    setToken(token: string) {
        if (token) this.jwtToken = token;
    }

    decodeToken(token: string) {
        if (token) return jwt_decode(token);
    }

    // getName() {
    //     this.decodeToken();
    //     return this.decodedToken ? this.decodedToken.name : null;
    // }

    // getEmail() {
    //     this.decodeToken();
    //     return this.decodedToken ? this.decodedToken.email : null;
    // }

    // getTipoUsuario() {
    //     this.decodeToken();
    //     return this.decodedToken ? this.decodedToken.tipoUsuario : null;
    // }

    // getExpiryTime() {
    //     this.decodeToken();
    //     return this.decodedToken ? this.decodedToken.exp : null;
    // }

    isTokenExpired(): boolean {
        const expiryTime: number = Number(this.decodedToken.exp);

        if (expiryTime) return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        else return false;
    }
}
