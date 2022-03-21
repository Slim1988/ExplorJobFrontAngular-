import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { JobDomain } from '../models/job-domain.model';

@Injectable({
    providedIn: 'root'
})
export class JobDomainsProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getAll(): Observable<Array<JobDomain>> {
        return this.http.get<Array<JobDomain>>(
            this.url(
                this.apiRoutes.jobs.get.allJobDomains
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }
}
