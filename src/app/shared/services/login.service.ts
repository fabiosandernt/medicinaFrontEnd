import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    Login(values: any): Observable<any> {
        return this.httpClient.post<any>("user/login-user", values);
    }
}
