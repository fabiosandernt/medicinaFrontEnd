import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { HttpErrorInterceptor } from './errorHandle.interceptor';
import { JWTService } from '../services/jwtToken.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading-animation.service';

@Injectable({
    providedIn:'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private jwt: JWTService,
        private loader: LoadingService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const usuarioLogado = this.authService.isLoggedIn;
        const tokenAcesso = this.jwt.getToken();

        // const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (tokenAcesso != null && usuarioLogado == true) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenAcesso}`,
                    'Content-type': 'application/json'
                },
                url: environment.apiUrl + request.url
            });
        }
        this.loader.show()

        return next.handle(request).pipe(
            finalize(() => this.loader.hide())
        );
    }
}

export const httpInterceptorProviders = [
    { provide:
        HTTP_INTERCEPTORS,
        useClass:
            HttpRequestInterceptor,
            HttpErrorInterceptor,
        multi: true
    },
];
