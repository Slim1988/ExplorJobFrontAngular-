import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiActionResponse } from '../../../infrastructure/providers/api-action.response';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { UserMeetingCreateCommand } from '../commands/user-meeting-create.command';

@Injectable({
    providedIn: 'root'
})
export class UserMeetingsProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public met(
        command: UserMeetingCreateCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.userMeetings.post.create
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }
}
