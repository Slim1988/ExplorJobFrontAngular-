import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable({
    providedIn: 'root'
})
export class ObjectsManipulatorService {
    public constructor() { }

    public static flatObjectValuesAsArray(
        object: Object
    ): Array<any> {
        return Object.values(object).reduce((
            accumulator: any,
            value: any
        ) => typeof value === 'object' && !R.isNil(value)
            ? accumulator.concat(this.flatObjectValuesAsArray(
                Object.values(value)
            ))
            : Array.isArray(value)
                ? accumulator.concat(
                    this.flatObjectValuesAsArray(value)
                )
                : accumulator.concat(
                    value
                ),
        []);
    }

    public flatObjectValuesAsArray(
        object: Object
    ): Array<any> {
        return ObjectsManipulatorService.flatObjectValuesAsArray(
            object
        );
    }
}
