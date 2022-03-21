import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PrimeNGCalendarService {
    public constructor() { }

    /**
     * Issues:
     * - https://github.com/primefaces/primeng/issues/2426
     * - https://github.com/primefaces/primeng/issues/3611
     */
    public fixIssueFromCalendarUTC(
        date: Date
    ): Date {
        return new Date(date.setDate(
            date.getDate() + 1
        ));
    }
}
