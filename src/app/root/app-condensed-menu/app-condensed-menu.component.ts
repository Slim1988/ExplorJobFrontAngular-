import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { AccountConversation } from 'src/app/modules/account/models/account-conversation.model';
import { AccountFavorite } from 'src/app/modules/account/models/account-favorite.model';
import { Account } from 'src/app/modules/account/models/account.model';
import { CONFIG } from '../../config/config';
import { REDIRECTIONS } from '../../config/redirections';
import { ParentComponent } from '../../infrastructure/components/parent.component';
import { AccountDeleteCommand } from '../../modules/account/commands/account-delete.command';
import { AccountMenu } from '../../modules/account/models/account-menu.model';
import { AccountProvider } from '../../modules/account/providers/account.provider';
import { AccountService } from '../../modules/account/services/account.service';
import { AuthService } from '../../modules/auth/services/auth.service';
@Component({
    selector: 'app-condensed-menu',
    templateUrl: './app-condensed-menu.component.html',
    styleUrls: [
        './app-condensed-menu.component.css'
    ]
})
export class AppCondensedMenuComponent extends ParentComponent implements OnInit {
    public AccountMenu = AccountMenu;
    public conversations: AccountConversation[];
    @Output()
    public burgerMenuTriggered: EventEmitter<string> = new EventEmitter();

    public readonly redirections: any = REDIRECTIONS;

    public readonly facebookUrl: string = CONFIG.explorJob.socialMedias.facebook;
    public readonly instagramUrl: string = CONFIG.explorJob.socialMedias.instagram;
    public readonly linkedInUrl: string = CONFIG.explorJob.socialMedias.linkedIn;

    public displayConfirmDeleteAccount: boolean = false;

    private accountUrl: string = 'account';

    public constructor(
        public readonly authService: AuthService,
        public readonly accountService: AccountService,
        private readonly accountProvider: AccountProvider,
        private readonly router: Router
    ) {
        super();
    }

    public ngOnInit(): void {
        this.load();
     }

    public closeCondensedMenu(): void {
        this.burgerMenuTriggered.emit('');
    }

    public handleRouterLink(
        link: string
    ): void {
        this.closeCondensedMenu();
        this.router.navigateByUrl(`/${ link }`);
    }

    public handleAccountLink(
        link: string|null
    ): void {
        this.closeCondensedMenu();

        this.router.navigateByUrl(
            !R.isNil(link)
            ? `/${ this.accountUrl }/${ link }`
            : this.accountUrl
        );
    }

    public logout(): void {
        this.closeCondensedMenu();
        this.router.navigateByUrl(`/logout`);
    }

    public becomeProfessional(): void {
        this.closeCondensedMenu();

        this.router.navigateByUrl(`${
            this.accountUrl
        }/${
            AccountMenu.AccountBecomeProfessional
        }`);
    }

    public changePassword(): void {
        this.closeCondensedMenu();

        this.router.navigateByUrl(`${
            this.accountUrl
        }/${
            AccountMenu.AccountChangePassword
        }`);
    }

    public deleteAccount(): void {
        this.displayConfirmDeleteAccount = true;
    }

    public confirmDeleteAccount(): void {
        this.accountProvider.delete(
            this.mapDeleteCommand()
        ).subscribe(
            (response: any) => { },
            (error: any) => { },
            () => {
                this.closeCondensedMenu();
                this.authService.logout();
            }
        );
    }

    public cancelDeleteAccount(): void {
        this.displayConfirmDeleteAccount = false;
    }
    public numberOfUnreadMessages(): number {
        let numberOfUnreadMessages: number = 0;
        this.conversations.forEach(x => numberOfUnreadMessages = numberOfUnreadMessages + x.numberOfUnreadMessages());
        return numberOfUnreadMessages;
    }
    public accountProfilePhotoDefault(): string {
        return CONFIG.explorJob.users.photo.default;
    }
    private load(): void {
        const account: Account | null = this.accountService.get();

        if (!R.isNil(account)) {
            this.conversations = this.mergeMessageProposalsIntoMessages(
                account.conversations
            );
        }
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
    private mapDeleteCommand(): AccountDeleteCommand {
        return new AccountDeleteCommand(
            this.accountService.get()?.id
        );
    }
}
