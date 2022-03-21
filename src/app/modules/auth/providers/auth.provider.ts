import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { ChangePasswordCommand } from '../commands/change-password.command';
import { ConfirmEmailCommand } from '../commands/confirm-email.command';
import { ForgottenPasswordCommand } from '../commands/forgotten-password.command';
import { RegisterCommand } from '../commands/register.command';
import { ResetPasswordCommand } from '../commands/reset-password.command';
import { AuthToken } from '../models/auth-token.model';
import { LoginQuery } from '../queries/login.query';

@Injectable({
    providedIn: 'root'
})
export class AuthProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public login(
        query: LoginQuery
    ): Observable<AuthToken> {
        return this.http.post<AuthToken>(
            this.url(
                this.apiRoutes.auth.post.login
            ),
            query,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public register(
        command: RegisterCommand
    ): Observable<any> {
        return this.http.post<any>(
            this.url(
                this.apiRoutes.auth.post.register
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public confirmEmail(
        command: ConfirmEmailCommand
    ): Observable<any> {
        return this.http.post<any>(
            this.url(
                this.apiRoutes.auth.post.confirmEmail
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public changePassword(
        command: ChangePasswordCommand
    ): Observable<any> {
        return this.http.put<any>(
            this.url(
                this.apiRoutes.auth.put.changePassword
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError)
        );
    }

    public forgottenPassword(
        command: ForgottenPasswordCommand
    ): Observable<any> {
        return this.http.post<any>(
            this.url(
                this.apiRoutes.auth.post.forgottenPassword
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public resetPassword(
        command: ResetPasswordCommand
    ): Observable<any> {
        return this.http.post<any>(
            this.url(
                this.apiRoutes.auth.post.resetPassword
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }
}
