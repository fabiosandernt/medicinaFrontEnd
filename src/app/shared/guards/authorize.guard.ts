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

@Injectable({
    providedIn: 'root'
})
 export class AuthorizeGuard implements CanActivate {
    constructor(
        private jwtService: JWTService,
        private _router: Router,
        private authService: AuthService,
    ) {}

    canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const tokenAcesso = this.authService.isTokenValid;
        const isLogged = this.authService.isLoggedIn

        if (tokenAcesso && isLogged)
        {
            // if (this.jwtService.isTokenExpired() != false)
            // {
            //     this._router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } });
            //     return false;
            // }
            return true;
        }

        this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
