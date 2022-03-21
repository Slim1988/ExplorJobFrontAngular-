import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { environment } from 'src/environments/environment';
import { AuthEvents } from '../events/auth.events';
import { AuthToken } from '../models/auth-token.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly events: EventEmitter<string> = new EventEmitter();

    private readonly accessTokenStorageKey: string = environment.auth.tokens.storageKeys.access;
    private readonly refreshTokenStorageKey: string = environment.auth.tokens.storageKeys.refresh;

    public constructor(
        private readonly router: Router
    ) { }

    public SetLogin(
        authToken: AuthToken
    ) {
        if (!R.isNil(authToken)) {
            this.setToken(
                this.accessTokenStorageKey,
                authToken.accessToken
            );

            this.setToken(
                this.refreshTokenStorageKey,
                authToken.refreshToken
            );

            this.events.emit(AuthEvents.LoggedIn);
            this.router.navigateByUrl('/account');
        }
    }

    public logout(): void {
        this.events.emit(AuthEvents.LoggedOut);
        setTimeout(() => this.clearTokens(), 250);
        setTimeout(() => this.router.navigateByUrl('/login'), 500);
    }

    public isLoggedIn(): boolean {
        return !R.isNil(
            this.getJwtToken()
        );
    }

    public getUserId(): string|null {
        if (this.isLoggedIn()) {
            const token: any = AuthToken.decode(
                this.getToken(
                    this.accessTokenStorageKey
                )
            );

            return !R.isNil(token)
                && !R.isNil(token.sub)
                ? token.sub
                : null;
        }
        else {
            return null;
        }
    }

    public getJwtToken(): string|null {
        const accessToken: string|null = this.getToken(
            this.accessTokenStorageKey
        );

        return !R.isNil(accessToken)
            ? `Bearer ${ accessToken }`
            : null;
    }

    private getToken(
        storageKey: string
    ): string|null {
        const token: string|null = localStorage.getItem(
            storageKey
        );

        return !R.isNil(token)
            ? token
            : null;
    }

    private setToken(
        storageKey: string,
        token: string
    ): void {
        localStorage.removeItem(
            storageKey
        );

        localStorage.setItem(
            storageKey,
            token
        );
    }

    private clearTokens(): void {
        localStorage.removeItem(
            this.accessTokenStorageKey
        );

        localStorage.removeItem(
            this.refreshTokenStorageKey
        );
    }
}
