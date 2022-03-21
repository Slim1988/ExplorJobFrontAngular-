import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { SearchQuery } from '../queries/search.query';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private query: SearchQuery;
    private localisationSearchField: string;

    public constructor() { }

    public hasQuery(): boolean {
        return !R.isNil(
            this.query
        );
    }

    public hasLocalisationSearchField(): boolean {
        return !R.isNil(
            this.localisationSearchField
        )
        && !R.isEmpty(
            this.localisationSearchField
        )  ;
    }

    public getQuery(): SearchQuery {
        return this.query;
    }

    public getLocalisationSearchField(): string {
        return this.localisationSearchField;
    }

    public setQuery(
        query: SearchQuery
    ): void {
        this.query = query;
    }

    public setLocalisationSearchField(
        localisationSearchField: string
    ): void {
        this.localisationSearchField = localisationSearchField;
    }

    public clearQuery(): void {
        this.query = null;
    }

    public clearLocalisationSearchField(): void {
        this.localisationSearchField = null;
    }
}
