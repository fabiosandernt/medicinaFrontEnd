// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { JWTTokenService } from '../services/jwtToken.service';
// import { LocalStorageService } from '../services/localStorage.service';
// import { LoginService } from '../services/login.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorizeGuard implements CanActivate {
//     constructor(
//         private loginService: LoginService,
//         private authStorageService: LocalStorageService,
//         private jwtService: JWTTokenService,
//         private _router: Router
//     ) {}

//     canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable | Promise | boolean {
//         if (this.jwtService.getUser()) {
//             if (this.jwtService.isTokenExpired()) return this._router.navigate(["/auth/login"]);
//             else return true;
//         }
//         else {
//             return new Promise((resolve) => {
//                 this.loginService.signIncallBack().then((e: any) => {
//                     resolve(true);
//                 }).catch((e: any) => {
//                     return this._router.navigate(["/auth/login"]);
//                 });
//             });
//         }
//     }
// }
