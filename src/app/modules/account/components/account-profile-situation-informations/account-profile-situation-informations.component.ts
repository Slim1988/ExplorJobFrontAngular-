import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { UsersProvider } from '../../../users/providers/users.provider';
import { AccountSituationInformationsUpdateCommand } from '../../commands/account-situation-informations-update.command';
import { AccountEvents } from '../../events/account.events';
import { Account } from '../../models/account.model';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { UserDegree } from './../../../users/models/user-degree.model';
import { UserProfessionalSituation } from './../../../users/models/user-professional-situation.model';

@Component({
    selector: 'account-profile-situation-informations',
    templateUrl: './account-profile-situation-informations.component.html',
    styleUrls: [
        './account-profile-situation-informations.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class AccountProfileSituationInformationsComponent extends ParentComponent implements OnInit, DoCheck, OnDestroy {
    public situationInformationsForm: FormGroup;

    public degrees: Array<UserDegree>;
    public degreesDropdown: Array<SelectItem> = [];
    public degreesDropdownSelected: SelectItem = null;

    public professionalSituations: Array<UserProfessionalSituation>;
    public professionalSituationsDropdown: Array<SelectItem> = [];
    public professionalSituationsDropdownSelected: SelectItem = null;

    public account: Account|null;

    @ViewChild('windowTop')
    public windowTop: HTMLElement|any;

    public constructor(
        private readonly accountService: AccountService,
        private readonly accountProvider: AccountProvider,
        private readonly usersProvider: UsersProvider,
        private readonly messageService: MessageService
    ) {
        super();
        this.setSituationInformationsForm();
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
                ))  {
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

    public updateSituationInformations(): void {
        if (this.situationInformationsForm.valid) {
            this.messageService.clear();

            this.accountProvider.updateSituationInformations(
                this.mapSituationInformationsFormToUpdateCommand()
            ).subscribe(
                (response: any) => {
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
                (error: any) => {
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
        this.getDegrees();
        this.getProfessionalSituations();
    }

    private setSituationInformationsForm(): void {
        this.situationInformationsForm = new FormGroup({
            lastDegree: new FormControl('', []),
            professionalSituation: new FormControl('', []),
            currentCompany: new FormControl('', [
                Validators.maxLength(
                    CONFIG.restrictions.users.currentCompany.maxLength
                )
            ]),
            currentSchool: new FormControl('', [
                Validators.maxLength(
                    CONFIG.restrictions.users.currentSchool.maxLength
                )
            ])
        });
    }

    private setGeneralInformationsFormValues(): void {
        if (!R.isNil(this.situationInformationsForm)
        && !R.isNil(this.account)) {
            this.situationInformationsForm.setValue({
                lastDegree: !R.isNil(this.account.user.lastDegree)
                    ? this.account.user.lastDegree.id
                    : null,
                professionalSituation: !R.isNil(this.account.user.professionalSituation)
                    ? this.account.user.professionalSituation.id
                    : null,
                currentCompany: this.account.user.currentCompany,
                currentSchool: this.account.user.currentSchool
            });
        }
    }

    private mapSituationInformationsFormToUpdateCommand(): AccountSituationInformationsUpdateCommand {
        return new AccountSituationInformationsUpdateCommand(
            this.account.id,
            !R.isNil(this.degreesDropdownSelected)
                ? this.degreesDropdownSelected.value
                : null,
            !R.isNil(this.professionalSituationsDropdownSelected)
                ? this.professionalSituationsDropdownSelected.value
                : null,
            this.situationInformationsForm.value.currentCompany,
            this.situationInformationsForm.value.currentSchool
        );
    }

    private getDegrees(): void {
        this.usersProvider.getAllDegrees().subscribe(
            (degrees: Array<UserDegree>) => this.degrees = degrees,
            (error: any) => null,
            () => {
                this.degreesDropdown = [];

                this.degrees.map(
                    (degree: UserDegree) => this.degreesDropdown.push({
                        label: degree.label,
                        value: degree.id
                    } as SelectItem)
                );

                if (!R.isNil(this.account)
                && !R.isNil(this.account.user.lastDegree)) {
                    this.degreesDropdownSelected = this.degreesDropdown.find(
                        (item: SelectItem) => R.equals(
                            this.account.user.lastDegree.id,
                            item.value
                        )
                    );
                }
            }
        );
    }

    private getProfessionalSituations(): void {
        this.usersProvider.getAllProfessionalSituations().subscribe(
            (professionalSituations: Array<UserProfessionalSituation>) => this.professionalSituations = professionalSituations,
            (error: any) => null,
            () => {
                this.professionalSituationsDropdown = [];

                this.professionalSituations.map(
                    (professionalSituation: UserProfessionalSituation) => this.professionalSituationsDropdown.push({
                        label: professionalSituation.label,
                        value: professionalSituation.id
                    } as SelectItem)
                );

                if (!R.isNil(this.account)
                && !R.isNil(this.account.user.professionalSituation)) {
                    this.professionalSituationsDropdownSelected = this.professionalSituationsDropdown.find(
                        (item: SelectItem) => R.equals(
                            this.account.user.professionalSituation.id,
                            item.value
                        )
                    );
                }
            }
        );
    }
}
