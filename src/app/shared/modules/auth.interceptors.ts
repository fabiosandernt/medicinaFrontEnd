import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { JWTService } from '../services/jwtToken.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn:'root'
})

export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private jwtService: JWTService, private authService: AuthService) {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const req = request.clone({
    //         headers: request.headers
    //         .set('Authorization', `bearer ${this.jwtService.getUser()}`)
    //         .set('content-type', 'application/json'),
    //         url: environment.apiUrl
    //     });

    //     return next.handle(req);
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const usuarioLogado = this.authService.isLoggedIn;

        const isLoggedIn = usuarioLogado && usuarioLogado.token;

        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuarioLogado.token}`,
                    'Content-type': 'application/json'
                }
            });
        }

        return next.handle(request);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
