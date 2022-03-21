import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng';
import * as R from 'ramda';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { FilterService } from '../../../../infrastructure/services/filter.service';
import { JobUser } from '../../../jobs/models/job-user.model';
import { MessageEvents } from '../../../messaging/events/message.events';
import { UserFavoriteDeleteCommand } from '../../../users/commands/user-favorite-delete.command';
import { UserMeetingCreateCommand } from '../../../users/commands/user-meeting-create.command';
import { UserProfileModalSettings } from '../../../users/components/modal/user-profile/user-profile-modal.component';
import { User } from '../../../users/models/user.model';
import { UserFavoritesProvider } from '../../../users/providers/user-favorites.provider';
import { UserMeetingsProvider } from '../../../users/providers/user-meetings.provider';
import { AccountEvents } from '../../events/account.events';
import { AccountFavorite } from '../../models/account-favorite.model';
import { AccountService } from '../../services/account.service';
import { WriteMessageModalOptions } from './../../../messaging/components/modal/write-message/write-message-modal.component';
import { Account } from './../../models/account.model';

@Component({
    selector: 'account-favorites',
    templateUrl: './account-favorites.component.html',
    styleUrls: [
        './account-favorites.component.css'
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class AccountFavoritesComponent extends ParentComponent implements OnInit, DoCheck, OnDestroy {
    public favorites: Array<AccountFavorite> = null;
    public displayedFavorites: Array<AccountFavorite> = null;

    @ViewChild('filterFavoritesInput')
    public filterFavoritesInput: HTMLInputElement|any;

    public userProfileSettings: UserProfileModalSettings = {
        display: false,
        parameters: {
            user: null,
            job: null
        },
        options: {
            writeMessage: true
        }
    };

    public writeMessageOptions: WriteMessageModalOptions = {
        display: false
    } as WriteMessageModalOptions;

    private account: Account|null;

    public constructor(
        private readonly accountService: AccountService,
        private readonly userFavoritesProvider: UserFavoritesProvider,
        private readonly userMeetingsProvider: UserMeetingsProvider,
        private readonly filterService: FilterService,
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
                ))  {
                    this.load();
                }
            }
        );
    }

    public ngDoCheck(): void {
        if (R.isNil(this.favorites)) {
            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.account = null;
    }

    public filterFavorites(
        query: string
    ): void {
        if (R.isNil(query) || query.length === 0) {
            this.clearFilterFavorites();
        }
        else {
            this.displayedFavorites = this.filterService.filter(
                this.favorites,
                query
            );
        }
    }

    public clearFilterFavorites(): void {
        this.filterFavoritesInput.nativeElement.value = '';
        this.displayedFavorites = this.favorites;
    }

    public userProfileTo(
        user: User,
        jobUser: JobUser|null
    ): void {
        this.userProfileSettings = {
            display: true,
            parameters: {
                user: user,
                job: !R.isNil(jobUser)
                    ? jobUser
                    : null
            },
            options: {
                writeMessage: true
            }
        } as UserProfileModalSettings;
    }

    public handleUserProfileEvent(
        event: string
    ): void {
        this.accountService.reload().then(
            () => this.reload()
        );
    }

    public writeMessageTo(
        userId: string
    ): void {
        this.writeMessageOptions = {
            display: true,
            userId: userId,
            conversationId: null
        }  as WriteMessageModalOptions;
    }

    public handleWriteMessageEvent(
        event: string
    ): void {
        this.writeMessageOptions = {
            display: false
        } as WriteMessageModalOptions;

        switch (event) {
            case MessageEvents.SentOK:
                this.messageService.add({
                    severity: 'success',
                    closable: true,
                    detail: `Le message a été envoyé`
                });
                break;

            case MessageEvents.SentButError:
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    detail: `Le message n'a pas pu être envoyé`
                });
                break;

            case MessageEvents.NotSent:
            default:
                break;
        }

        setTimeout(() => {
            this.messageService.clear();
        }, 3500);
    }

    public removeFavorite(
        favorite: AccountFavorite
    ): void {
        this.confirmationService.confirm({
            message: `Êtes vous sûr de vouloir supprimer ce favoris ?`,
            header: 'Confirmation de suppression',
            icon: 'fa fa-trash red',
            accept: () => {
                this.messageService.clear();

                this.userFavoritesProvider.remove(
                    this.mapFavoriteToDeleteCommand(favorite)
                ).subscribe(
                    (response: any) => {
                        this.messageService.add({
                            severity: 'success',
                            closable: true,
                            detail: `Le favoris a été supprimé avec succès`
                        });

                        setTimeout(() => {
                            this.messageService.clear();
                        }, 2500);
                    },
                    (error: any) => {
                        this.messageService.add({
                            severity: 'error',
                            closable: true,
                            detail: `Le favoris n'a pas pu être supprimé`
                        });
                    },
                    () => {
                        this.accountService.reload().then(
                            () => this.reload()
                        );
                    }
                );
            },
            reject: () => null
        });
    }

    public hasMet(
        userId: string
    ): void {
        this.confirmationService.confirm({
            message: `Vous êtes-vous rencontrés ?`,
            header: 'Confirmation',
            accept: () => {
                this.messageService.clear();

                this.userMeetingsProvider.met(
                    this.mapUserMeetingCreateCommand(
                        userId
                    )
                ).subscribe(
                    (response: any) => { },
                    (error: any) => {
                        this.messageService.add({
                            severity: 'error',
                            closable: true,
                            detail: `La rencontre n'a pas pu être enregistrée`
                        });
                    },
                    () => {
                        setTimeout(() => {
                            this.messageService.clear();
                        }, 2500);

                        this.accountService.reload().then(
                            () => this.reload()
                        );
                    }
                );
            },
            reject: () => null
        });
    }

    public userInFavoriteIsOwner(
        userId: string
    ): boolean {
        return this.accountService.isUserIdAccount(
            userId
        );
    }

    public goToRequest(): void {
        this.router.navigateByUrl('/search/request');
    }

    private reload(): void {
        setTimeout(() => {
            this.account = null;
            this.favorites = [];
            this.displayedFavorites = [];
            this.load();

            if (R.isNil(this.account)) {
                this.reload();
            }
        }, 675);
    }

    private load(): void {
        const account: Account|null = this.accountService.get();

        if (!R.isNil(account)) {
            this.account = account;
            this.favorites = account.favorites;
            this.displayedFavorites = account.favorites;
        }
    }

    private mapFavoriteToDeleteCommand(
        favorite: AccountFavorite
    ): UserFavoriteDeleteCommand {
        return new UserFavoriteDeleteCommand(
            favorite.id
        );
    }

    private mapUserMeetingCreateCommand(
        userId: string
    ): UserMeetingCreateCommand {
        return new UserMeetingCreateCommand(
            !R.isNil(this.account)
                ? this.account.id
                : '',
            userId,
            true
        );
    }
}
