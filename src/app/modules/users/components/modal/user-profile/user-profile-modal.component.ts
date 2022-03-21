import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../../config/config';
import { ParentComponent } from '../../../../../infrastructure/components/parent.component';
import { AccountFavorite } from '../../../../account/models/account-favorite.model';
import { AccountService } from '../../../../account/services/account.service';
import { JobUser } from '../../../../jobs/models/job-user.model';
import { JobUsersProvider } from '../../../../jobs/providers/job-users.provider';
import { MessageSentConfirmationModalOptions } from '../../../../messaging/components/modal/message-sent-confirmation/message-sent-confirmation.component';
import { WriteMessageModalOptions } from '../../../../messaging/components/modal/write-message/write-message-modal.component';
import { MessageEvents } from '../../../../messaging/events/message.events';
import { UserFavoriteCreateCommand } from '../../../commands/user-favorite-create.command';
import { UserFavoriteDeleteCommand } from '../../../commands/user-favorite-delete.command';
import { UserProfileModalEvents } from '../../../events/user-profile-modal.events';
import { User } from '../../../models/user.model';
import { UserFavoritesProvider } from '../../../providers/user-favorites.provider';
import { UsersService } from '../../../services/users.service';
import { Account } from './../../../../account/models/account.model';
import { CompanyPromote } from './../../../../promotions/models/company-promote.model';
import { UserPublic } from './../../../models/user-public.model';

export interface UserProfileModalSettings {
    display: boolean;
    parameters: {
        user: User|UserPublic|null;
        job: JobUser|null;
    };
    options: {
        writeMessage: boolean|null;
    };
    promote?: CompanyPromote|null;
}

@Component({
    selector: 'user-profile-modal',
    templateUrl: './user-profile-modal.component.html',
    styleUrls: [
        './user-profile-modal.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class UserProfileModalComponent extends ParentComponent implements OnInit, DoCheck {
    @Input()
    public settings: UserProfileModalSettings;

    @Output()
    public events: EventEmitter<string> = new EventEmitter();

    public display: boolean|null;
    public displayWriteMessage: boolean|null;
    public account: Account|null;
    public user: User|UserPublic|null|any;
    public job: JobUser|null;
    public jobs: Array<JobUser>|null;

    public writeMessageOptions: WriteMessageModalOptions = {
        display: false
    } as WriteMessageModalOptions;

    public messageSentConfirmationModalOptions: MessageSentConfirmationModalOptions = {
        display: false,
        success: null
    };

    private defaultSettings: UserProfileModalSettings = {
        display: false,
        parameters: {
            user: null,
            job: null
        },
        options: {
            writeMessage: true
        }
    };

    public constructor(
        private readonly accountService: AccountService,
        private readonly jobUsersProvider: JobUsersProvider,
        private readonly userFavoritesProvider: UserFavoritesProvider,
        public readonly usersService: UsersService,
        private readonly messageService: MessageService,
        private readonly router: Router
    ) {
        super();
    }

    public ngOnInit(): void { }

    public ngDoCheck(): void {
        if (this.settings?.display === true
        && !R.isNil(this.settings?.parameters?.user)
        ) {
            this.setModalFromSettings();
        }
        else {
            this.clear();
        }
    }

    public closeModal(): void {
        this.clear();

        this.events.emit(
            UserProfileModalEvents.Closed
        );
    }

    public userPhotoDefault(): string {
        return CONFIG.explorJob.users.photo.default;
    }

    public userTitle(): string {
        return this.usersService.userTitle(
            this.user,
            this.job,
            this.jobs,
            this.account
        );
    }

    public userLastName(): string {
        return !R.isNil(this.user)
            ? this.user.lastName
            : '';
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
                this.messageSentConfirmationModalOptions = {
                    display: true,
                    success: true
                };
                break;

            case MessageEvents.SentButError:
                this.messageSentConfirmationModalOptions = {
                    display: true,
                    success: false
                };
                break;

            case MessageEvents.NotSent:
            default:
                break;
        }

        setTimeout(() => {
            this.messageService.clear();
        }, 3500);
    }

    public addToFavorite(
        userId: string,
        jobId: string|null
    ): void {
        if (!R.isNil(this.account)
        && !R.isNil(userId)
        && !this.account?.isJobUserInFavorites(jobId)
        ) {
            this.userFavoritesProvider.add(
                this.mapFavoriteToCreateCommand(
                    userId,
                    !R.isNil(jobId)
                        ? jobId
                        : null
                )
            ).subscribe(
                (response: any) => { },
                (error: any) => { },
                () => {
                    this.accountService.reload().then(
                        () => this.reload()
                    );
                }
            );
        }
    }

    public removeFavorite(
        userId: string,
        jobId: string
    ): void {
        const favorite: AccountFavorite|null = this.account.getFavorite(
            userId,
            jobId
        );

        if (!R.isNil(favorite)) {
            this.userFavoritesProvider.remove(
                this.mapFavoriteToDeleteCommand(
                    favorite
                )
            ).subscribe(
                (response: any) => { },
                (error: any) => { },
                () => {
                    this.accountService.reload().then(
                        () => this.reload()
                    );
                }
            );
        }
    }

    public goToLogin(): void {
        this.router.navigateByUrl('/login');
    }

    public goToCompanyPage(
        slug: string
    ) {
        this.router.navigateByUrl(`company/${slug}`);
    }


    private setModalFromSettings(): void {
        this.account = this.accountService.get();
        this.user = this.settings?.parameters?.user;

        if (!R.isNil(this.settings?.parameters?.job)) {
            this.job = this.settings?.parameters?.job;
        }

        if (this.usersService.isUserProfessional(
            this.user
        ) && R.isNil(this.jobs)
        ) {
            this.loadJobs();
        }

        this.displayWriteMessage = this.settings?.options?.writeMessage === true
            && !this.accountService.isUserIdAccount(this.user?.id);

        this.display = true;
    }

    private clear(): void {
        this.settings = this.defaultSettings;
        this.display = this.defaultSettings.display;
        this.displayWriteMessage = this.defaultSettings.options.writeMessage;
        this.account = null;
        this.user = null;
        this.job = null;
        this.jobs = null;
    }

    private reload(): void {
        setTimeout(() => {
            this.account = null;
            this.setModalFromSettings();

            if (R.isNil(this.account)) {
                this.reload();
            }
        }, 675);
    }

    private async loadJobs(): Promise<void> {
        this.jobs = [];

        await this.jobUsersProvider.getAllByUserId(
            this.user?.id
        ).subscribe(
            (jobs: Array<JobUser>) => jobs.map(
                (job: JobUser) => {
                    if (R.isNil(this.job)) {
                        this.job = job;
                    }
                    else if (!R.equals(
                        this.job.id,
                        job.id
                    )) {
                        this.jobs.push(
                            job
                        );
                    }
                }
            ),
            (error: any) => { throw error; },
            () => { }
        );
    }

    private mapFavoriteToCreateCommand(
        userId: string,
        jobId: string|null
    ): UserFavoriteCreateCommand {
        return new UserFavoriteCreateCommand(
            this.account?.id,
            userId,
            !R.isNil(jobId)
                ? jobId
                : null
        );
    }

    private mapFavoriteToDeleteCommand(
        favorite: AccountFavorite
    ): UserFavoriteDeleteCommand {
        return new UserFavoriteDeleteCommand(
            favorite.id
        );
    }
}
