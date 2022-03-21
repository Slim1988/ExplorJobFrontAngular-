import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { CompanyPromote } from '../models/company-promote.model';

@Injectable({
    providedIn: 'root'
})
export class PromotionsService {
    private promotes: Array<CompanyPromote>;

    public constructor() { }

    public hasPromotes(): boolean {
        return !R.isNil(
            this.promotes
        );
    }

    public getPromotes(): Array<CompanyPromote> {
        return this.promotes;
    }

    public setPromotes(
        promotes: Array<CompanyPromote>
    ): void {
        this.promotes = promotes;
    }

    public clearPromotes(): void {
        this.promotes = null;
    }
}
