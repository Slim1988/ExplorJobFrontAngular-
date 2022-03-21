import { FormGroup } from '@angular/forms';

export class ParentComponent {
    public calendarLocalization: any = {
        firstDayOfWeek: 0,
        dayNames: [
            'lundi',
            'mardi',
            'mercredi',
            'jeudi',
            'vendredi',
            'samedi',
            'dimanche'
        ],
        dayNamesShort: [
            'lun',
            'mar',
            'mer',
            'jeu',
            'ven',
            'sam',
            'dim'
         ],
        dayNamesMin: [
            'L',
            'M',
            'M',
            'J',
            'V',
            'S',
            'D'
        ],
        monthNames: [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'décembre'
        ],
        monthNamesShort: [
            'jan',
            'fév',
            'mar',
            'avr',
            'mai',
            'jun',
            'jul',
            'aoû',
            'sep',
            'oct',
            'nov',
            'déc'
        ],
        today: `Aujourd'hui`,
        clear: 'Effacer'
    };

    public constructor() {}

    public copyToClipboard(
        event: Event,
        value: string
    ): void {
        document.addEventListener('copy', (clipboardEvent: ClipboardEvent) => {
            clipboardEvent.clipboardData.setData('text/plain', (value));
            clipboardEvent.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }

    protected checkForms(
        forms: Array<FormGroup>
    ): void {
        forms.map(
            (form: FormGroup) => this.checkForm(form)
        );
    }

    protected checkForm(
        form: FormGroup
    ): void {
        for (const control in form.controls) {
            if (form.controls.hasOwnProperty(control)) {
                setTimeout(() => {
                    form.controls[control].updateValueAndValidity();

                    if (!form.controls[control].valid) {
                        form.controls[control].markAsDirty();
                    }
                }, 5);
            }
        }
    }

    protected resetForms(
        forms: Array<FormGroup>
    ): void {
        forms.map(
            (form: FormGroup) => this.resetForm(form)
        );
    }

    protected resetForm(
        form: FormGroup
    ): void {
        for (const control in form.controls) {
            if (form.controls.hasOwnProperty(control)) {
                setTimeout(() => {
                    form.controls[control].markAsPristine();
                }, 5);
            }
        }
    }
}
