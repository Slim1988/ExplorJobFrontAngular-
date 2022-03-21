import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiActionResponse } from '../../../infrastructure/providers/api-action.response';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { ContractUserAcceptanceCreateCommand } from '../commands/contract-user-acceptance-create.command';
import { Contract } from '../models/contract.model';

@Injectable({
    providedIn: 'root'
})
export class ContractsProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getOneById(
        id: string
    ): Observable<Contract> {
        return this.http.get<Contract>(
            this.url(
                this.apiRoutes.contracts.get.oneById,
                id
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public accept(
        command: ContractUserAcceptanceCreateCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.contracts.post.accept
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }
}
