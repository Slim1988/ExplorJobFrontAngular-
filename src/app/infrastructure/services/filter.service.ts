import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { ObjectsManipulatorService } from './objects-manipulator.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public constructor(
        private readonly objectsManipulatorService: ObjectsManipulatorService
    ) { }

    public filter(
        array: Array<any>,
        query: string
    ): Array<any> {
        if (R.isNil(array)
            || !Array.isArray(array)
            || R.isNil(query)
        ) {
            return [];
        }

        const queryParts: string[] = R.split(' ', query
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        );

        return array.filter(
            (item: any) => {
                const flattenObject: any = ObjectsManipulatorService.flatObjectValuesAsArray(
                    item
                ).map(
                    (value: any) => !R.isNil(value)
                        ? value.toString().toLowerCase()
                        : null
                ).toString();

                return queryParts.reduce((
                    accumulator: boolean,
                    value: string
                ) => {
                    return accumulator
                        && flattenObject.match(
                            `${ value.toLowerCase() }`, 'gi'
                        );
                    }, true
                );
            }
        );
    }
}
