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
        private localStorageService: LocalStorageService,
    ) {}

    canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // const usuarioLogado = this.authService.usuarioLogadoSubject.getValue();
        // const tokenAcesso = this.authService.getTokenAcesso;
        if (
            !this.authService.isLogged() ||
            this.jwtService.isTokenExpired() ||
            (this.authService.getUserSub() ?? 0) > 0)
        {
            //     if (_route.data['authNecessaria'] == false) {
            //         this._router.navigate(["/auth/login"],
            //             { queryParams: { returnUrl: state.url } }
            //         );
            //         return false;
            //     }) {
            // if (this.jwtService.isTokenExpired())
            // {
            //     return this._router.navigate(["/auth/login"]);
            // }
            this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
            return false
        }

        return true;

        // this.authService.getTokenAcesso();
        // const usuarioLogado = this.authService.usuarioLogadoSubject.getValue();

        // if ((usuarioLogado?.exp ?? 0) > 0) {
        //     if (_route.data['authNecessaria'] == false) {
        //         this._router.navigate(["/auth/login"],
        //             { queryParams: { returnUrl: state.url } }
        //         );
        //         return false;
        //     }

        //     return true;
        // }
        // else {
        //     if (_route.data['authNecessaria'] == true) {
        //         this._router.navigate(["/auth/login"],
        //             { queryParams: { returnUrl: state.url } }
        //         );
        //         return false;
        //     }
        //     return true;
        // }
    }
}
