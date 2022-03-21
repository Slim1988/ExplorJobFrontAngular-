import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EncoderService {
    public constructor() { }

    public encode(
        value: string
    ): string {
        return window.btoa(
            value
        );
    }

    public decode(
        value: string
    ): string {
        return window.atob(
            value
        );
    }
}
