import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {
    public constructor (
        private router: Router
    ) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
        .handle(request)
        .pipe(catchError((error: any) => {
            if (error.status === 403) {
                this.router.navigateByUrl('/login');
            }

            return throwError(
                (!R.isNil(error) && !R.isNil(error.error) && error.error.message)
                || error.statusText
            );
        }));
    }
}
