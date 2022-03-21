import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { ApiActionResponse } from '../../../infrastructure/providers/api-action.response';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { AccountContactInformationsUpdateCommand } from '../commands/account-contact-informations-update.command';
import { AccountDeleteCommand } from '../commands/account-delete.command';
import { AccountGeneralInformationsUpdateCommand } from '../commands/account-general-informations-update.command';
import { AccountIsProfessionalCommand } from '../commands/account-is-professional.command';
import { AccountSituationInformationsUpdateCommand } from '../commands/account-situation-informations-update.command';
import { AccountEvents } from '../events/account.events';
import { Account } from './../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class AccountProvider extends ParentProvider {
    public readonly events: EventEmitter<string> = new EventEmitter();

    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getByUserId(
        userId: string
    ): Observable<Account> {
        return this.http.get<Account>(
            this.url(
                this.apiRoutes.account.get.oneByUserId,
                userId
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public isProfessional(
        command: AccountIsProfessionalCommand
    ): Observable<any> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.account.put.isProfessional
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError),
            finalize(() => this.events.emit(AccountEvents.WasUpdated))
        );
    }

    public uploadPhoto(
        formData: FormData
    ): Observable<any> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.account.post.uploadPhoto
            ),
            formData,
            {
                reportProgress: true,
                observe: 'events'
            }
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError),
            finalize(() => this.events.emit(AccountEvents.WasUpdated))
        );
    }

    public updateGeneralInformations(
        command: AccountGeneralInformationsUpdateCommand
    ): Observable<any> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.account.put.updateGeneralInformations
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError),
            finalize(() => this.events.emit(AccountEvents.WasUpdated))
        );
    }

    public updateContactInformations(
        command: AccountContactInformationsUpdateCommand
    ): Observable<any> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.account.put.updateContactInformations
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError),
            finalize(() => this.events.emit(AccountEvents.WasUpdated))
        );
    }

    public updateSituationInformations(
        command: AccountSituationInformationsUpdateCommand
    ): Observable<any> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.account.put.updateSituationInformations
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError),
            finalize(() => this.events.emit(AccountEvents.WasUpdated))
        );
    }

    public delete(
        command: AccountDeleteCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.account.delete.delete
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodDelete),
            catchError(this.handleError),
            finalize(() => this.events.emit(AccountEvents.WasDeleted))
        );
    }
}
