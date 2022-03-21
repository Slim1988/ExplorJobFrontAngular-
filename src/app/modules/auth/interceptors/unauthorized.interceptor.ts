import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    public constructor (
        private authService: AuthService
    ) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(
            request
        ).pipe(catchError((error: any) => {
            if (error && error.url) {
                return next.handle(
                    request
                );
            }
            else {
                if ((error && error.status && error.status === 401)
                || R.equals(
                    String(error).toLowerCase(),
                    'unauthorized'
                )) {
                    this.authService.logout();
                }

                return !R.isNil(error)
                    ? throwError(
                        (!R.isNil(error.error)
                            ? error.error.message
                            : null)
                        || !R.isNil(error.statusText)
                            ? error.statusText
                            : null
                        || error
                    )
                    : null;
            }
        }));
    }
}
