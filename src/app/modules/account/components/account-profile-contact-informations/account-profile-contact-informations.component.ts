import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { UserContactInformation } from '../../../users/models/user-contact-information.model';
import { UserContactMethod } from '../../../users/models/user-contact-method.model';
import { UsersProvider } from '../../../users/providers/users.provider';
import { AccountAddressUpdateCommand } from '../../commands/account-address-update.command';
import { AccountContactInformationsUpdateCommand } from '../../commands/account-contact-informations-update.command';
import { AccountEvents } from '../../events/account.events';
import { Account } from '../../models/account.model';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'account-profile-contact-informations',
    templateUrl: './account-profile-contact-informations.component.html',
    styleUrls: [
        './account-profile-contact-informations.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class AccountProfileContactInformationsComponent extends ParentComponent implements OnInit, DoCheck, OnDestroy {
    public contactInformationsForm: FormGroup;

    public contactMethods: Array<UserContactMethod>;
    public contactMethodsDropdown: Array<SelectItem> = [];
    public contactMethodsDropdownSelected: Array<SelectItem> = [];

    public phoneMask: string = CONFIG.masks.phone;
    public zipCodeMask: string = CONFIG.masks.zipCode;

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
        this.setContactInformationsForm();
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

    public updateContactInformations(): void {
        if (this.contactInformationsForm.valid) {
            this.messageService.clear();

            this.accountProvider.updateContactInformations(
                this.mapContactInformationsFormToUpdateCommand()
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
        this.setContactInformationsFormValues();
        this.getContactMethods();
    }

    private setContactInformationsForm(): void {
        this.contactInformationsForm = new FormGroup({
            phone: new FormControl('', []),
            addressStreet: new FormControl('', [
                Validators.maxLength(
                    CONFIG.restrictions.users.address.street.maxLength
                )
            ]),
            addressComplement: new FormControl('', [
                Validators.maxLength(
                    CONFIG.restrictions.users.address.complement.maxLength
                )
            ]),
            addressZipCode: new FormControl('', [Validators.required]),
            addressCity: new FormControl('', [Validators.required,
                Validators.maxLength(
                    CONFIG.restrictions.users.address.city.maxLength
                )
            ]),
            contactMethods: new FormControl('', [])
        });
    }

    private setContactInformationsFormValues(): void {
        if (!R.isNil(this.contactInformationsForm)
        && !R.isNil(this.account)) {
            this.contactInformationsForm.setValue({
                phone: this.account.phone,
                addressStreet: !R.isNil(this.account.address)
                    ? this.account.address.street
                    : null,
                addressComplement: !R.isNil(this.account.address)
                    ? this.account.address.complement
                    : null,
                addressZipCode: !R.isNil(this.account.address)
                    ? this.account.address.zipCode
                    : null,
                addressCity: !R.isNil(this.account.address)
                    ? this.account.address.city
                    : null,
                contactMethods: []
            });
        }
    }

    private mapContactInformationsFormToUpdateCommand(): AccountContactInformationsUpdateCommand {
        return new AccountContactInformationsUpdateCommand(
            this.account.id,
            this.contactInformationsForm.value.phone,
            new AccountAddressUpdateCommand(
                this.contactInformationsForm.value.addressStreet,
                this.contactInformationsForm.value.addressComplement,
                this.contactInformationsForm.value.addressZipCode,
                this.contactInformationsForm.value.addressCity
            ),
            this.contactMethodsDropdownSelected.map(
                (item: SelectItem) => item.value
            )
        );
    }

    private getContactMethods(): void {
        this.usersProvider.getAllContactMethods().subscribe(
            (contactMethods: Array<UserContactMethod>) => this.contactMethods = contactMethods,
            (error: any) => null,
            () => {
                this.contactMethodsDropdown = [];
                this.contactMethodsDropdownSelected = [];

                this.contactMethods.map(
                    (contactMethod: UserContactMethod) => this.contactMethodsDropdown.push({
                        label: contactMethod.label,
                        value: contactMethod.id
                    } as SelectItem)
                );

                if (!R.isNil(this.account)
                && !R.isNil(this.account.user.contactMethods)
                && this.account.user.contactMethods.length > 0) {
                    this.account.user.contactMethods.map((
                        contactMethod: UserContactMethod
                    ) => {
                        const contactMethodFromDropdown: SelectItem|undefined = this.contactMethodsDropdown.find(
                            (item: SelectItem) => R.equals(
                                contactMethod.id,
                                item.value
                            )
                        );

                        if (!R.isNil(contactMethodFromDropdown)) {
                            this.contactMethodsDropdownSelected.push(
                                contactMethodFromDropdown
                            );
                        }
                    });
                }
            }
        );
    }
}
