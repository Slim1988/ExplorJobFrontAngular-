import {
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { ConfirmationService, MessageService } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { PaginatorEvent } from '../../../../infrastructure/events/paginator.event';
import { FilterService } from '../../../../infrastructure/services/filter.service';
import { JobUser } from '../../../jobs/models/job-user.model';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { ConversationDeleteCommand } from '../../../messaging/commands/conversation-delete.command';
import { MarkAsReadConversationCommand } from '../../../messaging/commands/mark-as-read-conversation.command';
import { SendMessageCommand } from '../../../messaging/commands/send-message.command';
import { WriteMessageModalOptions } from '../../../messaging/components/modal/write-message/write-message-modal.component';
import { MessageEvents } from '../../../messaging/events/message.events';
import { UserMeetingCreateCommand } from '../../../users/commands/user-meeting-create.command';
import { UserProfileModalSettings } from '../../../users/components/modal/user-profile/user-profile-modal.component';
import { User } from '../../../users/models/user.model';
import { UserMeetingsProvider } from '../../../users/providers/user-meetings.provider';
import { UsersService } from '../../../users/services/users.service';
import { AccountEvents } from '../../events/account.events';
import { AccountConversation } from '../../models/account-conversation.model';
import { AccountMessage } from '../../models/account-message.model';
import { ProposalStatus } from '../../models/proposalStatus';
import { AccountService } from '../../services/account.service';
import { AccountConversationComponent } from '../account-conversation/account-conversation.component';
import { MessagingProvider } from './../../../messaging/providers/messaging.provider';
import { Account } from './../../models/account.model';
interface ConversationsPaginationOptions {
    rowsPerPage: number;
    rowsPerPageOptions: Array<any>;
    totalRows: number;
    page: number;
}

@Component({
    selector: 'account-messaging',
    templateUrl: './account-messaging.component.html',
    styleUrls: ['./account-messaging.component.css'],
    providers: [ConfirmationService, MessageService]
})
export class AccountMessagingComponent
    extends ParentComponent
    implements OnInit, DoCheck, OnDestroy {
    public conversations: Array<AccountConversation> = null;
    public filteredConversations: Array<AccountConversation> = null;
    public displayedConversations: Array<AccountConversation> = null;
    public conversationSelected: AccountConversation = null;
    public conversationSelectedInterlocutorJobs: Array<JobUser> = null;
    public isFirstReload: boolean = true;
    public selectedConversationId: string;
    public paginationOptions: ConversationsPaginationOptions = {
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20, 30, 40, 50, { showAll: 'Tout' }],
        totalRows: !R.isNil(this.filteredConversations)
            ? this.filteredConversations.length
            : 0,
        page: 10
    };

    @ViewChild('filterConversationsInput')
    public filterConversationsInput: HTMLInputElement | any;

    @ViewChild('messagesElementEnd')
    public messagesElementEnd: HTMLElement | any;

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

    public writeMessageOptions: WriteMessageModalOptions = {
        display: false,
        shouldShowProposalCalendar: false,
    } as WriteMessageModalOptions;

    public account: Account | null;

    @Output('selectConversation')
    public sendNumberOfMessageUnreadEmitter: EventEmitter<number> = new EventEmitter<number>();

    public totalUnreadMessage: number;

    private conversationIdSet = new Set();

    public constructor(
        private readonly accountService: AccountService,
        private readonly usersService: UsersService,
        private readonly messagingProvider: MessagingProvider,
        private readonly jobUsersProvider: JobUsersProvider,
        private readonly userMeetingsProvider: UserMeetingsProvider,
        private readonly filterService: FilterService,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService,
        private readonly router: Router,
    ) {
        super();
        moment.tz.setDefault('Europe/Paris');
    }

    public ngOnInit(): void {
        this.accountService.events.subscribe((event: any) => {
            if (
                R.equals(R.toString(event), AccountEvents.IsLoaded) ||
                R.equals(R.toString(event), AccountEvents.WasUpdated)
            ) {
                this.load();
            }
        });
        this.setRefresh();
    }

    public ngDoCheck(): void {
        if (R.isNil(this.conversations)) {
            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.account = null;
    }

    public paginate(event: PaginatorEvent): void {
        this.displayedConversations = this.filteredConversations.slice(
            event.first,
            event.first + event.rows
        );
    }

    public filterConversations(query: string): void {
        if (R.isNil(query) || query.length === 0) {
            this.clearFilterConversations();
        } else {
            this.filteredConversations = this.filterService.filter(
                this.conversations,
                query
            );

            this.setDisplayedConversations();
        }
    }
    public shouldShowConversations(): boolean {
        return !this.conversations.every(c => c.display === false);
    }
    public clearFilterConversations(): void {
        this.filterConversationsInput.nativeElement.value = '';
        this.filteredConversations = this.conversations;
        this.setDisplayedConversations();
    }

    public selectConversation(conversation: AccountConversation): void {
        this.conversationSelected = conversation;
        this.selectedConversationId = this.conversationSelected.id;
        this.conversationSelectedInterlocutorJobs = null;
        this.sendNumberOfMessageUnreadEmitter.emit(this.getUnreadMessages(conversation));

        setTimeout(
            () =>
                this.messagesElementEnd.nativeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                }),
            75
        );

        this.messagingProvider
            .markAsReadConversation(
                this.mapConversationToMarkAsReadCommand(conversation)
            )
            .subscribe(
                (response: any) => { },
                (error: any) => { },
                () => { }
            );
    }




    public deleteConversation(conversation: AccountConversation): void {
        this.confirmationService.confirm({
            message: `Êtes vous sûr de vouloir supprimer cette conversation ?
            \n
            Supprimer cette conversation entraînera la suppression de votre éventuel rendez-vous à venir ou en attente de confirmation avec cette personne.`,
            header: 'Confirmation de suppression',
            icon: 'fa fa-trash red',
            accept: () => {
                this.messagingProvider
                    .deleteConversation(
                        this.mapDeleteConversationCommand(conversation)
                    )
                    .subscribe(
                        (response: any) => {
                            this.messageService.add({
                                severity: 'success',
                                closable: true,
                                detail: `La conversation a été supprimée avec succès`,
                            });
                        },
                        (error: any) => {
                            this.messageService.add({
                                severity: 'error',
                                closable: true,
                                detail: `La conversation n'a pas pu être supprimée`,
                            });
                        },
                        () => {
                            this.accountService
                                .reload()
                                .then(() => this.reload());
                        }
                    );
            },
            reject: () => null,
        });
    }

    public userProfileTo(user: User): void {
        const jobUser: JobUser | null =
            !R.isNil(user) &&
                !R.isNil(this.account) &&
                this.account.numberOfTimesUserIsInFavorites(user.id) === 1
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

    public userProfileToInterlocutorFromConversationSelected(): void {
        const user: User | null =
            !R.isNil(this.conversationSelected) &&
                !R.isNil(this.conversationSelected.interlocutor)
                ? this.conversationSelected.interlocutor
                : null;

        this.userProfileTo(user);
    }

    public handleUserProfileEvent(event: string): void {
        this.accountService.reload().then(() => this.reload());
    }

    public backToConversations(): void {
        this.conversationSelected = null;
        this.isFirstReload = false;
    }

    public userPhotoDefault(): string {
        return CONFIG.explorJob.users.photo.default;
    }
    public userTitle(): string {
        if (
            !R.isNil(this.conversationSelected) &&
            !R.isNil(this.conversationSelected.interlocutorId) &&
            !R.isNil(this.conversationSelected.interlocutor)
        ) {
            let jobs: Array<JobUser> | null = null;

            if (
                !this.usersService.isUserExplorer(
                    this.conversationSelected.interlocutor
                )
            ) {
                if (R.isNil(this.conversationSelectedInterlocutorJobs)) {
                    this.loadConversationSelectedInterlocutorJobs();
                } else {
                    jobs = this.conversationSelectedInterlocutorJobs;
                }
            }

            return this.usersService.userTitle(
                this.conversationSelected.interlocutor,
                null,
                jobs,
                !R.isNil(this.account) ? this.account : null
            );
        } else {
            return this.usersService.userTitle(null);
        }
    }

    public hasMet(): void {
        if (
            !R.isNil(this.account) &&
            !R.isNil(this.conversationSelected) &&
            !R.isNil(this.conversationSelected.interlocutorId)
        ) {
            this.confirmationService.confirm({
                message: `Vous êtes-vous rencontrés ?`,
                header: 'Confirmation',
                accept: () => {
                    this.messageService.clear();

                    this.userMeetingsProvider
                        .met(
                            this.mapUserMeetingCreateCommand(
                                this.conversationSelected.interlocutorId
                            )
                        )
                        .subscribe(
                            (response: any) => { },
                            (error: any) => {
                                this.messageService.add({
                                    severity: 'error',
                                    closable: true,
                                    detail: `La rencontre n'a pas pu être enregistrée`,
                                });
                            },
                            () => {
                                setTimeout(() => {
                                    this.messageService.clear();
                                }, 2500);

                                this.accountService
                                    .reload()
                                    .then(() => this.reload());
                            }
                        );
                },
                reject: () => null,
            });
        }
    }

    public transmitPhone(): void {
        if (
            !R.isNil(this.account?.phone) &&
            !R.isNil(this.conversationSelected)
        ) {
            this.messagingProvider
                .sendMessage(
                    this.mapConversationSelectedToSendMessageCommand(
                        `Mon numéro de téléphone est : ${this.account.phone}`
                    )
                )
                .subscribe(
                    (response: any) => { },
                    (error: any) => {
                        this.messageService.add({
                            severity: 'error',
                            closable: true,
                            detail: `Le messsage n'a pas pu être envoyé`,
                        });
                    },
                    () => {
                        this.reloadConversationSelected();
                    }
                );
        }
    }

    public writeMessageTo(userId: string, conversationId: string): void {
        this.writeMessageOptions = {
            display: true,
            userId: userId,
            conversationId: conversationId,
            shouldShowProposalCalendar: this.shouldShowProposalModal(),
        } as WriteMessageModalOptions;
    }

    public handleWriteMessageEvent(event: string): void {
        this.writeMessageOptions = {
            display: false,
        } as WriteMessageModalOptions;

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

    public goToRequest(): void {
        this.router.navigateByUrl('/search/request');
    }

    public setRefresh(): void {
        setInterval(
            () => this.reloadConversationSelected(),
            CONFIG.messaging.refresh.interval
        );
    }

    public getUpdatedNumberOfUnreadMessages(conversation: AccountConversation): number {
        if (R.equals(this.selectedConversationId, conversation.id) || this.conversationIdSet.has(conversation.id)) {
            this.conversationIdSet.add(this.selectedConversationId);
            return 0;
        }
        else {
            return conversation?.numberOfUnreadMessages();
        }
    }

    private getUnreadMessages(conversation: AccountConversation): number {
        this.totalUnreadMessage -= conversation.numberOfUnreadMessages();
        if (this.totalUnreadMessage > 0) {
            return this.totalUnreadMessage;
        }
        else {
            return 0;
        }
    }

    private initialisedTotalUnreadMessage(): void {
        let totalUnreadMessage: number = 0;
        this.conversations.forEach(conversation => {
            conversation.messages.forEach(message => {
                if (!message.read) {
                    totalUnreadMessage++;
                }
            });
        });
        this.totalUnreadMessage = totalUnreadMessage;
    }
    private shouldShowProposalModal(): boolean {
        const today = moment();
        return (this.conversationSelected?.messages.length > 0) && (
            this.conversationSelected?.proposals.find(
                (p) =>
                    p.proposalAppointments.findIndex(
                        (pa) =>
                            today.isBefore(pa.dateTime) &&
                            pa.proposalStaus === ProposalStatus.Approuved
                    ) !== -1
            ) === undefined
        );
    }
    private compareDate(date1: Date, date2: Date): number {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        const same = d1.getTime() === d2.getTime();
        if (same) {
            return 0;
        }

        if (d1 > d2) {
            return 1;
        }

        if (d1 < d2) {
            return -1;
        }
    }
    private setDisplayedConversations(): void {
        this.displayedConversations = !R.isNil(this.filteredConversations)
            ? this.filteredConversations.slice(
                0,
                this.paginationOptions.rowsPerPage
            )
            : [];
    }

    private reSetConversationSelected(): void {
        const conversationSelectedUpdated:
            | AccountConversation
            | undefined = this.conversations.find(
                (conversation: AccountConversation) =>
                    R.equals(this.conversationSelected?.id, conversation.id)
            );

        if (!R.isNil(conversationSelectedUpdated)) {
            this.selectConversation(conversationSelectedUpdated);
        }
    }

    private reloadConversationSelected(): void {
        if (!R.isNil(this.conversationSelected)) {
            this.accountService.reload().then(() => {
                setTimeout(() => {
                    this.load();
                    this.reSetConversationSelected();
                }, 750);
            });
        }
    }

    private reload(): void {
        setTimeout(() => {
            this.account = null;
            this.conversations = [];
            this.filteredConversations = [];
            this.displayedConversations = [];
            this.load();

            if (R.isNil(this.account)) {
                this.reload();
            }
        }, 675);
    }

    private load(): void {
        const account: Account | null = this.accountService.get();

        if (!R.isNil(account)) {
            this.account = account;
            this.conversations = this.mergeMessageProposalsIntoMessages(
                account.conversations
            );
            this.filteredConversations = this.mergeMessageProposalsIntoMessages(
                account.conversations
            );
            this.setDisplayedConversations();
            this.reSetConversationSelected();
            this.initialisedTotalUnreadMessage();
        }
    }
    private mergeMessageProposalsIntoMessages(
        conversations: AccountConversation[]
    ): AccountConversation[] {
        const conversationsBuffer: AccountConversation[] = [];
        if (!R.isNil(conversations)) {
            conversations.forEach((conversation) => {
                if (conversation.display) {
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
                }
            });
        }
        conversationsBuffer.forEach((conv) =>
            conv.messages.sort((a: AccountMessage, b: AccountMessage) => {
                return this.compareDate(a.date, b.date);
            })
        );
        return conversationsBuffer;
    }
    private async loadConversationSelectedInterlocutorJobs(): Promise<void> {
        this.conversationSelectedInterlocutorJobs = [];

        await this.jobUsersProvider
            .getAllByUserId(this.conversationSelected.interlocutorId)
            .subscribe(
                (jobs: Array<JobUser>) =>
                    (this.conversationSelectedInterlocutorJobs = jobs),
                (error: any) => {
                    throw error;
                },
                () => { }
            );
    }

    private mapDeleteConversationCommand(
        conversation: AccountConversation
    ): ConversationDeleteCommand {
        return new ConversationDeleteCommand(
            conversation?.id,
            conversation?.ownerId
        );
    }

    private mapConversationToMarkAsReadCommand(
        conversation: AccountConversation
    ): MarkAsReadConversationCommand {
        return new MarkAsReadConversationCommand(
            conversation?.id,
            this.account?.id
        );
    }

    private mapUserMeetingCreateCommand(
        userId: string
    ): UserMeetingCreateCommand {
        return new UserMeetingCreateCommand(this.account?.id, userId, true);
    }

    private mapConversationSelectedToSendMessageCommand(
        content: string
    ): SendMessageCommand {
        return new SendMessageCommand(
            this.conversationSelected?.id,
            this.account?.id,
            this.conversationSelected?.interlocutorId,
            content
        );
    }
}
