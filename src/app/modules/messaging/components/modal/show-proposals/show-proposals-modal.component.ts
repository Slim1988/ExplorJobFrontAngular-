import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import * as R from 'ramda';
import { ProposalStatus } from 'src/app/modules/account/models/proposalStatus';
import { CONFIG } from '../../../../../config/config';
import { ParentComponent } from '../../../../../infrastructure/components/parent.component';
import { ProposalAppointment } from '../../../../account/models/proposalAppointment';
import { AccountService } from '../../../../account/services/account.service';
import { MessageProposalAcceptanceCommand } from '../../../commands/message-proposal-acceptance-command';
import { SendMessageWithProposalsCommand } from '../../../commands/send-message-poposals.command';
import { MessageEvents } from '../../../events/message.events';
import { MessagingProvider } from '../../../providers/messaging.provider';
import { Account } from './../../../../account/models/account.model';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
export interface ShowProposalsModalOptions {
    proposalAppointments: ProposalAppointment[];
    display: boolean;
    userId: string;
    messageId: string;
    fromOwner: boolean;
    IntendedStatus: ProposalStatus;
    conversationId: string | null;
}

@Component({
    selector: 'show-proposals-modal',
    templateUrl: './show-proposals-modal.component.html',
    styleUrls: ['./show-proposals-modal.component.css'],
})
export class ShowProposalsModalComponent
    extends ParentComponent
    implements OnInit, DoCheck {
    @Input()
    public options: ShowProposalsModalOptions;

    @Output()
    public events: EventEmitter<string> = new EventEmitter();

    public messageForm: FormGroup;
    public selectedElement: ProposalAppointment;
    public displayedColumns: string[] = ['Date', 'Hours', 'Action'];
    public constructor(
        private readonly accountService: AccountService,
        private readonly messagingProvider: MessagingProvider
    ) {
        super();
        moment.tz.setDefault('Europe/Paris');
        this.setMessageForm();
    }

    public ngOnInit(): void {}

    public ngDoCheck(): void {
        if (!R.isNil(this.options) && !this.options.display) {
            this.setMessageForm();
        }
    }
    public SelectAppointmentProposal(element: ProposalAppointment): void {
        this.selectedElement = element;
    }
    public ResetSelectedAppointmentProposal(): void {
        this.selectedElement = null;
    }
    public isAppropvalView(): boolean {
        return this.options.IntendedStatus === ProposalStatus.Approuved;
    }
    public updateAppointmentProposal(): void {
        const account: Account | null = this.accountService.get();
        const messageId = this.options.messageId
            ? this.options.messageId
            : this.options.proposalAppointments.filter(
                  (p) => p.id === this.selectedElement.id
              )[0].messageProposal.commonId;
        const acceptanceCommand: MessageProposalAcceptanceCommand = new MessageProposalAcceptanceCommand(
            messageId,
            account.id,
            this.selectedElement.id,
            this.options.IntendedStatus,
            this.mapMessageWithProposalsFormToSendCommand()
        );
        this.messagingProvider.updateProposal(acceptanceCommand).subscribe(
            (response: any) => {
                this.events.emit(MessageEvents.SentOK);
            },
            (error: any) => {
                this.events.emit(MessageEvents.SentButError);
            },
            () => {}
        );
    }
    public sendMessage(): void {
        if (this.messageForm.valid) {
            this.messageForm.setErrors({ invalidate: true });
            if (this.selectedElement) {
                this.updateAppointmentProposal();
            }
        }
    }

    public handleModalClose(): void {
        this.events.emit(MessageEvents.NotSent);
    }

    public emitterIsReceiver(): boolean {
        return this.accountService.isUserIdAccount(this.options?.userId);
    }
    public canValidateProposal(): boolean {
        return !this.options?.fromOwner;
    }
    public convertDateForDTS(date: Date, sFormatting: string): string {
        return moment(date).add(moment(date).isDST() ? 2 : 1, 'hours').format(sFormatting);
    }
    private setMessageForm(): void {
        this.messageForm = new FormGroup({
            message: new FormControl('', [
                Validators.maxLength(CONFIG.restrictions.messages.maxLength),
            ]),
        });

        this.messageForm.setValue({
            message: '',
        });
    }
    private mapMessageWithProposalsFormToSendCommand(): SendMessageWithProposalsCommand {
        const account: Account | null = this.accountService.get();

        return new SendMessageWithProposalsCommand(
            !R.isNil(this.options.conversationId)
                ? this.options.conversationId
                : null,
            !R.isNil(account) ? account.id : '',
            this.options.userId,
            this.messageForm.value.message,
            null
        );
    }
}
