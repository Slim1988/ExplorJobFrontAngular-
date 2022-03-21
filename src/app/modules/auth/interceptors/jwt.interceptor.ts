import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public constructor (
        private authService: AuthService
    ) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn()) {
            request = request.clone({
                setHeaders: {
                    authorization: this.authService.getJwtToken()
                }
            });
        }

        return next.handle(
            request
        );
    }
}
