import { FormGroup, ValidatorFn } from '@angular/forms';
import * as R from 'ramda';

export function AtLeastOneInFormValidator(): ValidatorFn {
    return (control: FormGroup): { [ key: string ]: any }|null => {
        const atLeastOneIsSetted: boolean = !R.isNil(control)
            && !R.isNil(control.value)
            && Object.values(control.value).some(
                (neededControlFromForm: any) => {
                    return !R.isNil(neededControlFromForm)
                        && neededControlFromForm.length > 0;
                }
            );

        return !atLeastOneIsSetted
            ? { searchRequestAtLeastOne: control.value }
            : null;
    };
}
