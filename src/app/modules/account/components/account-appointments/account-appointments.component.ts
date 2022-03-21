import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as moment from 'moment-timezone';
import { MessageService } from 'primeng';
import * as R from 'ramda';
import { ShowReviewModalOptions } from 'src/app/modules/messaging/components/modal/review-modal/review-modal.component';
import { MessageEvents } from 'src/app/modules/messaging/events/message.events';
import { UserProfileModalSettings } from 'src/app/modules/users/components/modal/user-profile/user-profile-modal.component';
import { User } from 'src/app/modules/users/models/user.model';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { JobUser } from '../../../jobs/models/job-user.model';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { ShowProposalsModalOptions } from '../../../messaging/components/modal/show-proposals/show-proposals-modal.component';
import { UsersService } from '../../../users/services/users.service';
import { AccountEvents } from '../../events/account.events';
import { AccountConversation } from '../../models/account-conversation.model';
import { AccountMessage } from '../../models/account-message.model';
import { ProposalAppointment } from '../../models/proposalAppointment';
import { ProposalStatus } from '../../models/proposalStatus';
import { AccountService } from '../../services/account.service';
import { Account } from './../../models/account.model';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
export interface AppointmentViewObject {
    id: string;
    user: User;
    proposals: Array<ProposalAppointment>;
    job: string;
    interlocutorId: string;
    conversationId: string;
    fromInterlocutor: boolean;
}
export interface AppointmentPlainViewObject {
    id: string;
    user: User;
    proposal: ProposalAppointment;
    job: string;
    interlocutorId: string;
    conversationId: string;
    emitterOfFirstMessageId: string;
}

@Component({
    selector: 'account-appointments',
    templateUrl: './account-appointments.component.html',
    styleUrls: ['./account-appointments.component.css'],
})
export class AccountAppointmentsComponent extends ParentComponent implements OnInit, DoCheck, OnDestroy {

    public conversations: Array<AccountConversation> = null;
    public jobs: Array<JobUser> = null;

    public pendingAppointments: AppointmentViewObject[] = [];
    public futurAcceptedAppointments: AppointmentViewObject[] = [];
    public pastAcceptedAppointments: AppointmentPlainViewObject[] = [];

    public account: Account | null;
    public showProposalsOptions: ShowProposalsModalOptions = {
        display: false,
    } as ShowProposalsModalOptions;
    public showReviewModalOptions: ShowReviewModalOptions = {
        display: false,
    } as ShowReviewModalOptions;
    public userProfileSettings: UserProfileModalSettings = {
        display: false,
        parameters: {
            user: null,
            job: null,
        },
        options: {
            writeMessage: false,
        },
    } as UserProfileModalSettings;
    public displayedColumns: string[] = ['name', 'job', 'action'];
    public pastAcceptedAppointmentsDisplayedColumns: string[] = [
        'name',
        'job',
        'date',
        'action',
    ];
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    public constructor(
        private _snackBar: MatSnackBar,
        private readonly accountService: AccountService,
        private readonly usersService: UsersService,
        private readonly jobUsersProvider: JobUsersProvider,
        private readonly messageService: MessageService,
        private readonly titlecasePipe: TitleCasePipe,
        private readonly uppercasePipe: UpperCasePipe,
    ) {
        super();
    }

    public get ProposalStatus(): typeof ProposalStatus {
        return ProposalStatus;
    }

    public ngOnInit(): void {
        this.accountService.events.subscribe((event: any) => {
            if (R.equals(R.toString(event), AccountEvents.IsLoaded) ||
                R.equals(R.toString(event), AccountEvents.WasUpdated)
            ) {
                this.load();
            }
        });
    }

    public userProfileTo(user: User): void {
        const jobUser: JobUser | null =
            !R.isNil(user) &&
                !R.isNil(this.account) &&
                R.equals(this.account.numberOfTimesUserIsInFavorites(user.id), 1)
                ? this.account.getFavoriteByUserId(user.id)?.jobUser
                : null;

        this.userProfileSettings = {
            display: true,
            parameters: {
                user: user,
                job: !R.isNil(jobUser) ? jobUser : null,
            },
            options: {
                writeMessage: false,
            },
        } as UserProfileModalSettings;
    }

    public handleUserProfileEvent(event: string): void {
        this.accountService.reload().then(() => this.reload());
    }

    public ngDoCheck(): void {
        if (R.isNil(this.conversations)) {
            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.account = null;
    }

    public setDisplayName(firstName: string, lastName: string) {
        return `${this.titlecasePipe.transform(
            firstName
        )} ${this.uppercasePipe
            .transform(lastName)
            .slice(0, 1)}${lastName ? '.' : ''}`;
    }

    public filterAppointments(): void {

        this.conversations.map((conversation: AccountConversation) => {

            const displayName: string = this.setDisplayName(
                conversation.interlocutor.firstName,
                conversation.interlocutor.lastName
            );

            const proposals: Array<AccountMessage> = [...conversation.proposals.map((p: AccountMessage) => p)];

            const today = moment();

            const pendingAppointments: Array<ProposalAppointment> = this.filterProposals(
                proposals,
                ProposalStatus.Pending,
                false);

            const futureAcceptedAppointments: Array<ProposalAppointment> = this.filterProposals(
                proposals,
                ProposalStatus.Approuved,
                false)
                .filter((pa: ProposalAppointment) => today.isSameOrBefore(moment(pa.dateTime))
                );

            const pastAcceptedAppointments = this.filterProposals(
                proposals,
                ProposalStatus.Approuved,
                true)
                .filter((pa: ProposalAppointment) => today.isAfter(moment(pa.dateTime))
                );

            if (!R.isEmpty(pendingAppointments)) {

                const fromInterlocutor: boolean = this.accountService.isUserIdAccount(
                    pendingAppointments[0].messageProposal.receiverId
                );

                this.pendingAppointments.push({
                    id: displayName,
                    user: conversation.interlocutor,
                    proposals: this.sortAppointmentsByDate(pendingAppointments),
                    job: this.userTitle(conversation),
                    conversationId: conversation.id,
                    interlocutorId: conversation.interlocutorId,
                    fromInterlocutor: fromInterlocutor,
                });
            }

            if (!R.isEmpty(futureAcceptedAppointments)) {

                const fromInterlocutor: boolean = this.accountService.isUserIdAccount(
                    futureAcceptedAppointments[0].messageProposal.receiverId
                );

                this.futurAcceptedAppointments.push({
                    id: displayName,
                    user: conversation.interlocutor,
                    proposals: this.sortAppointmentsByDate(futureAcceptedAppointments),
                    job: this.userTitle(conversation),
                    conversationId: conversation.id,
                    interlocutorId: conversation.interlocutorId,
                    fromInterlocutor: fromInterlocutor,
                });
            }

            if (!R.isEmpty(pastAcceptedAppointments)) {

                const sortedPastAcceptedAppointments = this.sortAppointmentsByDate(pastAcceptedAppointments);

                sortedPastAcceptedAppointments.map((pa: ProposalAppointment) => {
                    this.pastAcceptedAppointments.push({
                        id: displayName,
                        user: conversation.interlocutor,
                        proposal: pa,
                        job: this.userTitle(conversation),
                        conversationId: conversation.id,
                        interlocutorId: conversation.interlocutorId,
                        emitterOfFirstMessageId: conversation.messages[0].emitterId
                    });
                });
            }
        });
    }

    public handleShowProposalsEvent(event: string): void {
        this.showProposalsOptions = {
            display: false,
        } as ShowProposalsModalOptions;

        switch (event) {
            case MessageEvents.SentOK:
                this.reloadConversationSelected();
                break;

            case MessageEvents.SentButError:
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    detail: `Le message n'a pas pu être envoyé`,
                });

                setTimeout(() => {
                    this.messageService.clear();
                }, 3500);
                break;

            case MessageEvents.NotSent:
            default:
                break;
        }
    }

    public handleShowReviewEvent(event: string): void {
        this.showReviewModalOptions = {
            display: false,
        } as ShowReviewModalOptions;

        switch (event) {
            case MessageEvents.SentOK:
                this.showReviewModalOptions = {
                    display: false,
                } as ShowReviewModalOptions;
                this.showModalReviewConfirmation();
                this.pendingAppointments = [];
                this.futurAcceptedAppointments = [];
                this.pastAcceptedAppointments = [];
                this.accountService.reload().then(() => {
                    setTimeout(() => {
                        this.load();
                    }, 750);
                });
                break;

            case MessageEvents.SentButError:
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    detail: `Le message n'a pas pu être envoyé`,
                });
                this.showReviewModalOptions = {
                    display: false,
                } as ShowReviewModalOptions;
                setTimeout(() => {
                    this.messageService.clear();
                }, 3500);
                break;

            case MessageEvents.NotSent:
            default:
                break;
        }
    }

    public showModalReviewConfirmation(): void {
        this._snackBar.open('Merci d\'avoir complété l\'évaluation', 'x', {
            duration: 5000,
            panelClass: ['mat-snack-bar-panel'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    public isForApproval(proposal: AppointmentViewObject): ProposalStatus {
        return proposal.fromInterlocutor
            ? ProposalStatus.Approuved
            : ProposalStatus.Declined;
    }

    public showReview(
        proposal: ProposalAppointment,
        interlocutorName: string,
        conversationId: string,
        interlocutorId: string,
        emitterOfFirstMessage: string
    ): void {
        this.showReviewModalOptions = {
            commonId: proposal.messageProposal.commonId,
            proposalId: proposal.id,
            display: true,
            conversationId: conversationId,
            interlocutorName: interlocutorName,
            receiverId: interlocutorId,
            emitterId: emitterOfFirstMessage
        } as ShowReviewModalOptions;
    }

    public showProposals(
        proposal: AppointmentViewObject,
        proposalStatus: ProposalStatus
    ): void {
        this.showProposalsOptions = {
            proposalAppointments: proposal.proposals,
            display: true,
            userId: proposal.interlocutorId,
            messageId: null,
            fromOwner: null,
            conversationId: proposal.conversationId,
            IntendedStatus: proposalStatus,
        } as ShowProposalsModalOptions;
    }

    public convertDateForDTS(date: Date, sFormatting: string): string {
        return moment(date).add(moment(date).isDST() ? 2 : 1, 'hours').format(sFormatting);
    }

    public userTitle(conversation: AccountConversation): string {
        if (
            !R.isNil(conversation) &&
            !R.isNil(conversation.interlocutorId) &&
            !R.isNil(conversation.interlocutor)
        ) {
            let account: Account | null = null;
            let jobs: Array<JobUser> | null = null;

            if (!this.usersService.isUserExplorer(conversation.interlocutor)) {
                account = this.accountService.get();

                if (!R.isNil(account)) {
                    if (R.isNil(this.jobs)) {
                        this.loadJobs(conversation);
                    } else {
                        jobs = this.jobs;
                    }
                }
            }

            return this.usersService.userTitle(
                conversation.interlocutor,
                null,
                jobs,
                !R.isNil(account) ? account : null
            );
        } else {
            return this.usersService.userTitle(null);
        }
    }

    private async loadJobs(conversation: AccountConversation): Promise<void> {
        this.jobs = [];

        await this.jobUsersProvider
            .getAllByUserId(conversation.interlocutorId)
            .subscribe(
                (jobs: Array<JobUser>) => (this.jobs = jobs),
                (error: any) => {
                    throw error;
                },
                () => { }
            );
    }

    private load(): void {
        const account: Account | null = this.accountService.get();

        if (!R.isNil(account)) {
            this.account = account;
            this.conversations = account.conversations;
            this.filterAppointments();
        }
    }

    private reloadConversationSelected(): void {
        this.futurAcceptedAppointments = [];
        this.pastAcceptedAppointments = [];
        this.pendingAppointments = [];
        this.accountService.reload().then(() => {
            setTimeout(() => {
                this.load();
            }, 750);
        });
    }

    private reload(): void {
        setTimeout(() => {
            this.account = null;
            this.conversations = [];
            this.load();

            if (R.isNil(this.account)) {
                this.reload();
            }
        }, 675);
    }

    private sortAppointmentsByDate(
        appointments: ProposalAppointment[]
    ): ProposalAppointment[] {
        const list: ProposalAppointment[] = appointments.sort((a, b) => {
            return (
                new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
            );
        });
        return list;
    }

    private filterProposals(
        proposals: Array<AccountMessage>,
        proposalStatus: ProposalStatus,
        shouldUpdateTime: boolean): Array<ProposalAppointment> {

        let tempList: Array<ProposalAppointment> = [];

        proposals.map(
            (p: AccountMessage) =>
            (tempList = tempList.concat(
                p.proposalAppointments.filter(
                    (pa: ProposalAppointment) => R.equals(pa.proposalStaus, proposalStatus)
                )
            ))
        );

        if (shouldUpdateTime) {
            tempList = JSON.parse(JSON.stringify(tempList));
        }
        return tempList;
    }
}
