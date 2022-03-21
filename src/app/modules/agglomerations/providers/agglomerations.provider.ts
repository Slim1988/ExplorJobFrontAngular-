import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { Agglomeration } from '../models/agglomeration';

@Injectable({
    providedIn: 'root'
})
export class AgglomerationsProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getAll(): Observable<Array<Agglomeration>> {
        return this.http.get<Array<Agglomeration>>(
            this.url(
                this.apiRoutes.agglomerations.get.all
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }
}
