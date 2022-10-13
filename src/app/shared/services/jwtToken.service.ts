import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IJWT } from '../models/jwt';
import { LocalStorageService } from './localStorage.service'

@Injectable({
    providedIn:'root'
})
export class JWTService {

    jwtToken: string;
    decodedToken: IJWT;

    constructor(private localStorage: LocalStorageService) {}

    private tokenModel: IJWT;

    hasToken():boolean {
        return this.getToken() === null ? false : true;
    }

    setToken(token: string) {
        if (token) this.jwtToken = token;

        this.localStorage.set(token);
    }

    decodeToken() {
        if (this.jwtToken) {
            return this.decodedToken = jwt_decode(this.jwtToken);
        }
    }

    getToken() {
        return this.localStorage.get()
    }

    removeToken() {
        this.localStorage.remove()
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
