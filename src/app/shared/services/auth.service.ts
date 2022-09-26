import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { LocalStorageService } from "./localStorage.service";

export class AuthService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser = {};

    constructor(private _httpClient: HttpClient, public _router: Router, private localStorageService: LocalStorageService){}

    get isLoggedIn(): boolean {
        let authToken = this.localStorageService.get('access_token');
        return (authToken !== null) ? true : false;
    }

    logout() {
        if (this.localStorageService.remove('access_token') == null) {
            this._router.navigate(['users/login']);
        }
    }
}
