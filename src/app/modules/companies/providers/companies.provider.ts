import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { Company } from '../models/company.model';

@Injectable({
    providedIn: 'root'
})
export class CompaniesProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getOneBySlug(
        slug: string
    ): Observable<Company> {
        return this.http.get<Company>(
            this.url(
                this.apiRoutes.companies.get.oneBySlug,
                slug
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }
}
