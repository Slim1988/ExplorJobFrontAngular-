import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { ChangePasswordCommand } from '../../../auth/commands/change-password.command';
import { AuthProvider } from '../../../auth/providers/auth.provider';
import { AuthService } from '../../../auth/services/auth.service';
import { ConfirmPasswordValidator } from '../../../auth/validators/confirm-password.validator';
import { AccountDeleteCommand } from '../../commands/account-delete.command';
import { AccountIsProfessionalCommand } from '../../commands/account-is-professional.command';
import { AccountEvents } from '../../events/account.events';
import { AccountConversation } from '../../models/account-conversation.model';
import { AccountMenu } from '../../models/account-menu.model';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { AccountMessagingComponent } from '../account-messaging/account-messaging.component';
import { AccountProvider } from './../../providers/account.provider';

@Component({
    selector: 'account-layout-sidebar',
    templateUrl: './account-layout-sidebar.component.html',
    styleUrls: [
        './account-layout-sidebar.component.css'
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class AccountLayoutSidebarComponent extends ParentComponent implements OnInit, DoCheck, OnDestroy {
    public AccountMenu = AccountMenu;
    public account: Account | null;
    public conversations: AccountConversation[];


    @Input()
    public menuItemSelectedAtInit: string;

    @Input()
    public numberOfUnreadMessageFromConversation: number;

    @Output()
    public menuItemSelected: EventEmitter<string> = new EventEmitter();

    public changePasswordForm: FormGroup;
    public displayChangePasswordFormModal: boolean = false;
    public displayBecomeProfessionalModal: boolean = false;
    public isMessageRead: boolean = false;

    public constructor(
        public readonly authService: AuthService,
        private readonly authProvider: AuthProvider,
        public readonly accountService: AccountService,
        private readonly accountProvider: AccountProvider,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService,
        private readonly router: Router
    ) {
        super();
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
                )) {
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
    public ngOnChange() {
        this.UdaptedNumberOfUnreadMessages();
    }
    public ngOnDestroy(): void {
        this.account = null;
    }

    public setMenuItemSelected(
        menuItemSelected: string
    ): void {
        this.menuItemSelected.emit(
            menuItemSelected
        );
        if (menuItemSelected = 'account-messaging') {
            this.isMessageRead = true;
        }
    }

    public accountProfilePhotoDefault(): string {
        return CONFIG.explorJob.users.photo.default;
    }

    public displayBecomeProfessionalButton(): boolean {
        if (R.isNil(this.account)) {
            return false;
        }

        const professionalSituationsToExclude: Array<string> = [
            'Non scolarisé (-16 ans)',
            'Collégien',
            'Lycéen'
        ].map(
            (item: string) => item.toLowerCase()
        );

        return !this.account.isProfessional()
            && !R.contains(
                !R.isNil(this.account.user.professionalSituation)
                    ? this.account.user.professionalSituation.label.toLowerCase()
                    : null,
                professionalSituationsToExclude
            );
    }

    public displayProfessionalMenuPart(): boolean {
        return !R.isNil(this.account)
            && this.account.isProfessional();
    }

    public showBecomeProfessionalModal(): void {
        this.displayBecomeProfessionalModal = true;
    }

    public becomeProfessional(): void {
        if (!R.isNil(this.account)
            && !this.account.isProfessional()) {
            this.accountProvider.isProfessional(
                this.isProfessionalCommand(
                    this.account
                )
            ).subscribe(
                (response: any) => { },
                (error: any) => { },
                () => {
                    this.displayBecomeProfessionalModal = false;
                    this.accountService.getAsync().then(() => {
                        setTimeout(
                            () => window.location.reload(), 450
                        );

                        this.router.navigateByUrl(
                            `/account/${AccountMenu.AccountJobs}`
                        );
                    });
                }
            );
        }
    }

    public displayChangePasswordModal(): void {
        this.setChangePasswordForm();
        this.displayChangePasswordFormModal = true;
    }

    public changePassword(): void {
        if (this.changePasswordForm.valid) {
            this.displayChangePasswordFormModal = false;

            this.authProvider.changePassword(
                this.mapChangePasswordFormToCommand()
            ).subscribe(
                (response: any) => {
                    this.messageService.add({
                        severity: 'success',
                        closable: true,
                        life: 5000,
                        detail: `Le mot de passe a été modifié avec succès`
                    });
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        closable: true,
                        life: 5000,
                        detail: `Le mot de passe n'a pas pu être modifié`
                    });
                },
                () => { }
            );
        }
    }

    public deleteAccount(): void {
        this.confirmationService.confirm({
            message: `Êtes vous sûr de vouloir supprimer votre compte ? <strong class="red">Vous ne pourrez pas le récupérer</strong>`,
            header: 'Confirmation de suppression',
            icon: 'fa fa-user-times red',
            accept: () => {
                this.accountProvider.delete(
                    this.mapDeleteCommand()
                ).subscribe(
                    (response: any) => {
                        this.messageService.add({
                            severity: 'success',
                            closable: true,
                            detail: `Votre compte a été supprimé avec succès`
                        });
                    },
                    (error: any) => {
                        this.messageService.add({
                            severity: 'error',
                            closable: true,
                            detail: `Votre compte n'a pas pu être supprimé`
                        });
                    },
                    () => setTimeout(() => this.authService.logout(), 2250)
                );
            },
            reject: () => null
        });
    }
    public numberOfUnreadMessages(): number {
        let numberOfUnreadMessages: number = 0;
        if (!R.isNil(this.conversations)) {
            this.conversations.forEach(x => numberOfUnreadMessages = numberOfUnreadMessages + x.numberOfUnreadMessages());
        }
        return numberOfUnreadMessages;
    }
    public UdaptedNumberOfUnreadMessages(): number {
        return this.numberOfUnreadMessageFromConversation;
    }
    private mergeMessageProposalsIntoMessages(
        conversations: AccountConversation[]
    ): AccountConversation[] {
        const conversationsBuffer: AccountConversation[] = [];
        if (!R.isNil(conversations)) {
            conversations.forEach((conversation) => {
                conversationsBuffer.push(
                    new AccountConversation(
                        conversation.id,
                        conversation.ownerId,
                        conversation.interlocutorId,
                        conversation.interlocutor,
                        conversation.met,
                        conversation.messages.concat(conversation.proposals),
                        conversation.proposals,
                        conversation.updatedOn,
                        conversation.display
                    )
                );
            });
        }
        return conversationsBuffer;
    }
    private load(): void {
        this.account = this.accountService.get();
        if (!R.isNil(this.account)) {
            this.conversations = this.mergeMessageProposalsIntoMessages(
                this.account.conversations
            );
        }
        this.numberOfUnreadMessageFromConversation = this.numberOfUnreadMessages();
    }

    private setChangePasswordForm(): void {
        this.changePasswordForm = new FormGroup({
            currentPassword: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(
                    CONFIG.restrictions.passwords.minLength
                )
            ]),
            confirmPassword: new FormControl('', [
                Validators.required
            ])
        });

        this.changePasswordForm.setValidators(
            Validators.compose([
                ConfirmPasswordValidator()
            ])
        );
    }

    private isProfessionalCommand(
        account: Account
    ): AccountIsProfessionalCommand {
        return new AccountIsProfessionalCommand(
            account.id
        );
    }

    private mapDeleteCommand(): AccountDeleteCommand {
        return new AccountDeleteCommand(
            this.account.id
        );
    }

    private mapChangePasswordFormToCommand(): ChangePasswordCommand {
        return new ChangePasswordCommand(
            this.account.email,
            this.changePasswordForm.value.currentPassword,
            this.changePasswordForm.value.password
        );
    }
}
