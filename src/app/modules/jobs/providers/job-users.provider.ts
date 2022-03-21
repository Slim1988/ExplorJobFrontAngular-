import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiActionResponse } from '../../../infrastructure/providers/api-action.response';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { JobUserCreateCommand } from '../commands/job-user-create.command';
import { JobUserUpdateCommand } from '../commands/job-user-update.command';
import { JobUserDeleteCommand } from './../commands/job-user-delete.command';
import { JobUser } from './../models/job-user.model';

@Injectable({
    providedIn: 'root'
})
export class JobUsersProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getAllByUserId(
        userId: string
    ): Observable<Array<JobUser>> {
        return this.http.get<Array<JobUser>>(
            this.url(
                this.apiRoutes.jobs.get.allJobUsersByUserId,
                userId
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public getAllCompanies(): Observable<Array<string>> {
        return this.http.get<Array<string>>(
            this.url(
                this.apiRoutes.companies.get.allJobUsersCompanies
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public create(
        command: JobUserCreateCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.jobs.post.create
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public update(
        command: JobUserUpdateCommand
    ): Observable<ApiActionResponse> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.jobs.put.update
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError)
        );
    }

    public delete(
        command: JobUserDeleteCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.jobs.delete.delete
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodDelete),
            catchError(this.handleError)
        );
    }
}
