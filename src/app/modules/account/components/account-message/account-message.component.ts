import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment-timezone';
import { MessageService } from 'primeng';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { ShowProposalsModalOptions } from '../../../messaging/components/modal/show-proposals/show-proposals-modal.component';
import { MessageEvents } from '../../../messaging/events/message.events';
import { AccountMessage } from '../../models/account-message.model';
import { ProposalAppointment } from '../../models/proposalAppointment';
import { ProposalStatus } from '../../models/proposalStatus';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
@Component({
    selector: 'account-message',
    templateUrl: './account-message.component.html',
    styleUrls: ['./account-message.component.css'],
})
export class AccountMessageComponent extends ParentComponent implements OnInit {
    @Input()
    public message: AccountMessage;
    @Input()
    public conversationId: string;
    @Input()
    public userId: string;
    @Input()
    public interlocutorId: string;
    @Output()
    public events: EventEmitter<string> = new EventEmitter();

    public showProposalsOptions: ShowProposalsModalOptions = {
        display: false,
    } as ShowProposalsModalOptions;

    public constructor(
        private readonly messageService: MessageService,
        private readonly sanitizer: DomSanitizer
        ) {
        super();
    }

    public ngOnInit(): void {
        this.message.proposalAppointments?.sort(
            (p1, p2) => p2.proposalStaus - p1.proposalStaus
        );
    }

    public showProposals(): void {
        const proposals = this.message.proposalAppointments.sort((a, b) => {
            return (
                new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
            );
        });
        this.showProposalsOptions = {
            proposalAppointments: proposals.filter(p => p.proposalStaus !== ProposalStatus.Declined),
            display: true,
            userId: this.interlocutorId,
            messageId: this.message.commonId,
            fromOwner: this.message.fromOwner,
            conversationId: this.conversationId,
            IntendedStatus: this.message.fromInterlocutor ? ProposalStatus.Approuved : ProposalStatus.Declined,
        } as ShowProposalsModalOptions;
    }
    public convertDateForDTS(date: Date, sFormatting: string): string {
        return moment(date).add(moment(date).isDST() ? 2 : 1, 'hours').format(sFormatting);
    }
    public ShouldShowProposals(): boolean {
        return this.message.proposalAppointments?.some(
            (p) => p.proposalStaus === ProposalStatus.Pending
        );
    }
    public IsDeclinedProposal(proposal: ProposalAppointment): boolean {
        return proposal.proposalStaus === ProposalStatus.Declined;
    }
    public IsApprovedProposal(proposal: ProposalAppointment): boolean {
        return proposal.proposalStaus === ProposalStatus.Approuved;
    }
    public handleShowProposalsEvent(event: string): void {
        this.showProposalsOptions = {
            display: false,
        } as ShowProposalsModalOptions;

        switch (event) {
            case MessageEvents.SentOK:
                this.events.emit(MessageEvents.SentOK);
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
}
