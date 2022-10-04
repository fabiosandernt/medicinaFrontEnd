import { Injectable } from '@angular/core';

import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JWTService } from '../services/jwtToken.service';
import { LocalStorageService } from '../services/localStorage.service';

@Injectable({
    providedIn: 'root'
})
 export class AuthorizeGuard implements CanActivate {
    constructor(
        private jwtService: JWTService,
        private _router: Router,
        private authService: AuthService,
        private localStorageService: LocalStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        if (this.authService.isLoggedIn) {
            if (this.jwtService.isTokenExpired())
            {
                return this._router.navigate(["/auth/login"]);
            }
            else return true;
        }
        this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false
    }
}
