import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { SearchResultsPublic } from '../models/search-results-public.model';
import { SearchResultsRestricted } from '../models/search-results-restricted.model';
import { SearchQuery } from '../queries/search.query';

@Injectable({
    providedIn: 'root'
})
export class SearchProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public searchPublic(
        query: SearchQuery
    ):  Observable<SearchResultsPublic> {
        return this.http.post<SearchResultsPublic>(
            this.url(
                this.apiRoutes.search.post.searchPublic
            ),
            query,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public searchRestricted(
        query: SearchQuery
    ):  Observable<SearchResultsRestricted> {
        return this.http.post<SearchResultsRestricted>(
            this.url(
                this.apiRoutes.search.post.searchRestricted
            ),
            query,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }
}
