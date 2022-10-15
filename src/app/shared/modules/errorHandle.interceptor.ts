import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ToastrNotificationService } from "../services/toastr-notification.service";

export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrNotificationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage: string;

                if(error.error instanceof ErrorEvent) {
                    errorMessage = `Error ${error.error.message}`;
                    this.toastr.errorMessageBackEnd(error.error.message)
                } else {
                    errorMessage = `Error Code: ${error.status}\n Message Error: ${error.message}`;
                }

                return throwError(errorMessage)
            })
        )
    }
}
