import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpError } from "../pipes/httpError.pipe";

import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private httpClient: HttpClient, private _httpError: HttpError) {}

    Login(data: any): Observable<any> {
        return this.httpClient.post(
            environment.apiUrl + "Authentication", data, { responseType: 'text' as 'json' }
        ).pipe(catchError(this._httpError.handleError));
    }
}
