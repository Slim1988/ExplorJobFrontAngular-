import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiActionResponse } from '../../../infrastructure/providers/api-action.response';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { UserFavoriteCreateCommand } from '../commands/user-favorite-create.command';
import { UserFavoriteDeleteCommand } from '../commands/user-favorite-delete.command';

@Injectable({
    providedIn: 'root'
})
export class UserFavoritesProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public add(
        command: UserFavoriteCreateCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.userFavorites.post.add
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public remove(
        command: UserFavoriteDeleteCommand
    ): Observable<ApiActionResponse> {
        return this.http.delete<ApiActionResponse>(
            this.url(
                this.apiRoutes.userFavorites.delete.remove,
                command.id
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodDelete),
            catchError(this.handleError)
        );
    }
}
