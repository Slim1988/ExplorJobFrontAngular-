import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import * as R from 'ramda';

export function ConfirmPasswordValidator(): ValidatorFn {
    return (control: FormGroup): null => {
        const password: AbstractControl = control.get('password');
        const confirmPassword: AbstractControl = control.get('confirmPassword');

        if (password
        && confirmPassword
        && !R.equals(password.value, confirmPassword.value)
        ) {
            confirmPassword.setErrors({
                confirmPassword: true
            });
        }

        return null;
    };
}
