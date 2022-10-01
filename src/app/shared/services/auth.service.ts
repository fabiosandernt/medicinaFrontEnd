import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usuario } from "../models/usuario";
import { JWTService } from "./jwtToken.service";
import { LocalStorageService } from "./localStorage.service";

export class AuthService {
    // headers = new HttpHeaders().set('Content-Type', 'application/json');
    // currentUser = {};

    // constructor(private _httpClient: HttpClient, public _router: Router, private localStorageService: LocalStorageService){}

    // get isLoggedIn(): boolean {
    //     let authToken = this.localStorageService.get('SSID');
    //     return (authToken !== null) ? true : false;
    // }

    // logout() {
    //     this.localStorageService.remove('SSID')
    //     this._router.navigate(['auth/login']);
    // }

    private usuarioAtualSubject: BehaviorSubject<Usuario>;
    public usuarioAtual: Observable<Usuario>;

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private jwtService: JWTService
    ) {
        this.usuarioAtualSubject = new BehaviorSubject<Usuario>(
            JSON.parse(this.localStorageService.get('SSID'))
        );

        this.usuarioAtual = this.usuarioAtualSubject.asObservable();
    }

    public get isLoggedIn(): Usuario {
        return this.usuarioAtualSubject.value;
    }

    login(data: any) {
        return this.http.post<any>('/Usuario', { data }).pipe(map(
        result => {
            this.localStorageService.set('SSID', JSON.stringify(result));

            const tokenDecoded: any = this.jwtService.decodeToken(result);
            this.usuarioAtualSubject.next(tokenDecoded);

            return result;
        }));
    }

    logout() {
        localStorage.removeItem('SSID');
        this.usuarioAtualSubject.next(null);
    }
}
