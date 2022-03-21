import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MaterialDatepickerService {
    public constructor() { }

    public fixIssueFromDatepickerUTC(
        date: Date
    ): Date {
        return new Date(date.setDate(
            date.getDate() + 1
        ));
    }
}
