import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  ACCESS_TOKEN,
  AuthService,
} from 'src/app/common/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authData = localStorage.getItem(ACCESS_TOKEN);
    if (authData) {
      request = request.clone({
        setHeaders: {
          authorization: 'Bearer ' + `${authData}`,
        },
      });
    }

    return next.handle(request).pipe(
      finalize(() => {}),
      map((event) => event),
      catchError((error) => {
        if (error.error.statusCode === 403 || error.error.statusCode === 401) {
          this.authService.logout();
        }
        throw error;
      })
    );
  }

  constructor(private router: Router, private authService: AuthService) {}
}
