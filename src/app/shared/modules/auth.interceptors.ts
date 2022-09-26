import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JWTTokenService } from '../services/jwtToken.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private jwtService: JWTTokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request.clone({
            headers: request.headers
            .set('Authorization', `bearer ${this.jwtService.getUser()}`)
            .set('content-type', 'application/json'),
            url: environment.apiUrl
        });

        return next.handle(req);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
