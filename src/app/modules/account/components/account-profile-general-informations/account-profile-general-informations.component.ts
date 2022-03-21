import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MessageService } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AccountGeneralInformationsUpdateCommand } from '../../commands/account-general-informations-update.command';
import { AccountPhotoUploadEvents } from '../../events/account-photo-upload.events';
import { AccountEvents } from '../../events/account.events';
import { Account } from '../../models/account.model';
import { MaterialDatepickerService } from './../../../../infrastructure/services/material-datepicker.service';
import { AccountProvider } from './../../providers/account.provider';
import { AccountService } from './../../services/account.service';

@Component({
    selector: 'account-profile-general-informations',
    templateUrl: './account-profile-general-informations.component.html',
    styleUrls: [
        './account-profile-general-informations.component.css'
    ],
    providers: [
        MessageService,
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'fr-FR'
        },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_MOMENT_DATE_FORMATS
        },
    ]
})
export class AccountProfileGeneralInformationsComponent extends ParentComponent implements OnInit, DoCheck, OnDestroy {
    public generalInformationsForm: FormGroup;

    public account: Account|null;

    @ViewChild('windowTop')
    public windowTop: HTMLElement|any;

    public constructor(
        private readonly accountService: AccountService,
        private readonly accountProvider: AccountProvider,
        private readonly messageService: MessageService,
        private readonly materialDatepickerService: MaterialDatepickerService
    ) {
        super();
        this.setGeneralInformationsForm();
    }

    public ngOnInit(): void {
        this.accountService.events.subscribe(
            (event: any) => {
                if (R.equals(
                    R.toString(event),
                    AccountEvents.IsLoaded
                ) || R.equals(
                    R.toString(event),
                    AccountEvents.WasUpdated
                ) )  {
                    this.load();
                }
            }
        );
    }

    public ngDoCheck(): void {
        if (R.isNil(this.account)) {
            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.account = null;
    }

    public updateGeneralInformations(): void {
        if (this.generalInformationsForm.valid) {
            this.messageService.clear();

            this.accountProvider.updateGeneralInformations(
                this.mapGeneralInformationsFormToUpdateCommand()
            ).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        closable: true,
                        detail: `Les modifications ont bien été enregistrées`
                    });

                    setTimeout(() => this.windowTop.nativeElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest'
                    }), 75);

                    setTimeout(() => {
                        this.messageService.clear();
                    }, 5000);
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        closable: true,
                        detail: `Les modifications n'ont pas pu être enregistrées`
                    });
                },
                () => {
                    this.accountService.reload().then(
                        () => this.reload()
                    );
                }
            );
        }
        else {
            this.generalInformationsForm.markAllAsTouched();
        }
    }

    public handlePhotoUploadEvent(
        event: string
    ) {
        if (R.equals(
            AccountPhotoUploadEvents.Uploaded,
            event
        )) {
            this.accountService.getAsync().then(
                () => setTimeout(
                    () => window.location.reload(), 750
                )
            );
        }
        else if (
            R.equals(
                AccountPhotoUploadEvents.Error,
                event
            )
        ) {
            this.messageService.add({
                severity: 'error',
                closable: true,
                detail: `La photo n'a pas pu être uploadée`
            });
        }
    }

    public displayWarningForMinors(): boolean {
        return !R.isNil(this.account)
            && this.account.isMinor();
    }

    public clearGeneralInformationsFormEmail(): void {
        this.generalInformationsForm.controls.email.setValue(
            R.trim(this.generalInformationsForm.value.email)
        );
    }

    private reload(): void {
        setTimeout(() => {
            this.account = null;
            this.load();

            if (R.isNil(this.account)) {
                this.reload();
            }
        }, 675);
    }

    private load(): void {
        this.account = this.accountService.get();
        this.setGeneralInformationsFormValues();
    }

    private setGeneralInformationsForm(): void {
        this.generalInformationsForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            firstName: new FormControl('', [
                Validators.required,
                Validators.minLength(
                    CONFIG.restrictions.users.firstName.minLength
                ),
                Validators.maxLength(
                    CONFIG.restrictions.users.firstName.maxLength
                )
            ]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(
                    CONFIG.restrictions.users.lastName.minLength
                ),
                Validators.maxLength(
                    CONFIG.restrictions.users.lastName.maxLength
                )
            ]),
            birthDate: new FormControl('', [
                Validators.required
            ]),
            presentation: new FormControl('', [
                Validators.maxLength(
                    CONFIG.restrictions.users.presentation.maxLength
                )
            ])
        });
    }

    private setGeneralInformationsFormValues(): void {
        if (!R.isNil(this.generalInformationsForm)
        && !R.isNil(this.account)) {
            this.generalInformationsForm.setValue({
                email: this.account.email,
                firstName: this.account.user.firstName,
                lastName: this.account.user.lastName,
                birthDate: !R.isNil(this.account.user.birthDate)
                    && !R.equals(
                        this.account.user.birthDate as any as string,
                        CONFIG.dates.api.empty
                    )
                    ? new Date(this.account.user.birthDate)
                    : null,
                presentation: this.account.user.presentation
            });
        }
    }

    private mapGeneralInformationsFormToUpdateCommand(): AccountGeneralInformationsUpdateCommand {
        return new AccountGeneralInformationsUpdateCommand(
            this.account.id,
            this.generalInformationsForm.value.email,
            this.generalInformationsForm.value.firstName,
            this.generalInformationsForm.value.lastName,
            !R.isNil(this.generalInformationsForm.value.birthDate)
                ? this.materialDatepickerService.fixIssueFromDatepickerUTC(
                    new Date(this.generalInformationsForm.value.birthDate)
                )
                : null,
            this.generalInformationsForm.value.presentation
        );
    }
}
