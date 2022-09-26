import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpError } from "../pipes/httpError.pipe";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private httpClient: HttpClient, private _httpError: HttpError) {}

    Login(values: any): Observable<any> {
        return this.httpClient.post<any>("user/login-user", values).pipe(catchError(this._httpError.handleError));
    }
}
