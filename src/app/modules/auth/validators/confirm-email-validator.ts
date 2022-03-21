import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import * as R from 'ramda';

export function ConfirmEmailValidator(): ValidatorFn {
    return (control: FormGroup): null => {
        const email: AbstractControl = control.get('email');
        const confirmEmail: AbstractControl = control.get('confirmEmail');

        if (email
        && confirmEmail
        && !R.equals(email.value, confirmEmail.value)
        ) {
            confirmEmail.setErrors({
                confirmEmail: true
            });
        }

        return null;
    };
}
