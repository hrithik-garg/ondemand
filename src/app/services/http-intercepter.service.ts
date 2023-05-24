import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * This interceptor automatically adds the token header needed by our backend API if such token is present
 * in the current state of the application.
 */
@Injectable({
    providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
    constructor(
        private router: Router
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.body instanceof FormData) {
            request = request.clone({
                headers: request.headers.delete('Content-Type', 'Accept'),
            });
        } else if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set(
                    'Content-Type',
                    'application/json'
                ),
            });
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/');
                } else {
                    // TODO: Throw error (show error in toaster):- "Some error occured kindly check your data or try again"
                }

                return throwError(() => err);
            })
        );
    }
}