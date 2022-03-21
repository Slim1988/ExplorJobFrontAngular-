import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { CompanyPromote } from '../models/company-promote.model';

@Injectable({
    providedIn: 'root'
})
export class PromotionsProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getAllPromotesForSearchForm(): Observable<Array<CompanyPromote>> {
        return this.http.get<Array<CompanyPromote>>(
            this.url(
                this.apiRoutes.promotions.get.allForSearchForm
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }
}
