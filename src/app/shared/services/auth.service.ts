import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { JWTService } from "./jwtToken.service";

import { IJWT } from "../models/jwt";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn:'root'
})
export class AuthService {
    usuarioLogadoSubject = new BehaviorSubject<IJWT | null>(null);

    jwtHelperService: JwtHelperService = new JwtHelperService();

    constructor(
        private jwtService: JWTService,
    ) {}

    public get isLoggedIn(): IJWT {
        return this.usuarioLogadoSubject.getValue();
    }

    login(data: any) {
        try {
            this.jwtService.setToken(data);

            const tokenDecoded = this.jwtService.decodeToken() as IJWT;

            this.usuarioLogadoSubject.next(tokenDecoded);

            return true;
        }
        catch(error) {
            console.log('CatchError --> ', error);
            return of(false);
        }
    }

    isTokenValid(): string {
        var localStorageToken = this.jwtService.getToken();

        if (localStorageToken) {
            var isTokenExpired = this.jwtService.isTokenExpired();

            if (isTokenExpired) {
                this.usuarioLogadoSubject.next(null);
                return '';
            }

            return localStorageToken;
        }

        return '';
    }

    logout() {
        this.jwtService.removeToken()
        this.usuarioLogadoSubject.next(null);
    }
}
