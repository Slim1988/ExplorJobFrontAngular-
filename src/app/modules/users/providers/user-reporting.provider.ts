import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiActionResponse } from '../../../infrastructure/providers/api-action.response';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { UserReportedCreateCommand } from '../commands/user-reported-create.command';
import { UserReportingReason } from '../models/user-reporting-reason.model';

@Injectable({
    providedIn: 'root'
})
export class UserReportingProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getAllReportingReasons(): Observable<Array<UserReportingReason>> {
        return this.http.get<Array<UserReportingReason>>(
            this.url(
                this.apiRoutes.userReporting.get.allReportingReasons
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public create(
        command: UserReportedCreateCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.userReporting.post.create
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }
}
