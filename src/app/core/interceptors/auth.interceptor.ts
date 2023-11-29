import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authData = localStorage.getItem('token')
        if (authData) {
            request = request.clone({
                setHeaders: {
                    authorization: 'Bearer ' + `${authData}`
                }
            });
        }

        return next.handle(request)
            .pipe(finalize(() => {
            }), map(event => event), catchError(error => {
                if (error.error.statusCode === 403) {

                }
                if (error.error.statusCode === 401) {
                    
                }
                throw error;
            }),
            );
    }

    constructor(
        private router: Router,
    ) { }
}
