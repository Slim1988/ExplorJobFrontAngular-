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
import {
    NgxLinkifyjsService,
    NgxLinkifyOptions,
} from 'ngx-linkifyjs';
import * as R from 'ramda';
import { CONFIG } from '../../../../../config/config';
import { ParentComponent } from '../../../../../infrastructure/components/parent.component';
import { AccountService } from '../../../../account/services/account.service';
import { SendMessageWithProposalsCommand } from '../../../commands/send-message-poposals.command';
import { SendMessageCommand } from '../../../commands/send-message.command';
import { MessageEvents } from '../../../events/message.events';
import { MessagingProvider } from '../../../providers/messaging.provider';
import { Account } from './../../../../account/models/account.model';

export interface WriteMessageModalOptions {
    display: boolean;
    userId: string;
    conversationId: string | null;
    shouldShowProposalCalendar: boolean;
}

@Component({
    selector: 'write-message-modal',
    templateUrl: './write-message-modal.component.html',
    styleUrls: ['./write-message-modal.component.css'],
})
export class WriteMessageModalComponent
    extends ParentComponent
    implements OnInit, DoCheck {
    @Input()
    public options: WriteMessageModalOptions;
    public maximumCharacters = CONFIG.restrictions.messages.maxLength;

    @Output()
    public events: EventEmitter<string> = new EventEmitter();

    public messageForm: FormGroup;
    public dates: moment.Moment[];
    public constructor(
        public readonly linkifyService: NgxLinkifyjsService,
        private readonly accountService: AccountService,
        private readonly messagingProvider: MessagingProvider
    ) {
        super();
        this.setMessageForm();
        moment.tz.setDefault('Europe/Paris');
    }

    public ngOnInit(): void {
        this.dates = [];
    }

    public ngDoCheck(): void {
        if (!R.isNil(this.options) && !this.options.display) {
            this.setMessageForm();
        }
    }

    public remainingCharacters() {
        return this.maximumCharacters - this.messageForm.value.message?.length;
    }

    public sendMessage(): void {
        this.messageForm.get('message').markAsTouched();
        if (this.messageForm.valid && !this.emitterIsReceiver()) {
            this.messageForm.setErrors({ invalidate: true });
            if (this.dates.length === 0) {
                this.sendSimpleMessage();
            } else {
                this.sendMessageWithProposals();
            }
        }
    }
    public sendMessageWithProposals(): void {
        this.messagingProvider
            .sendMessageWithProposals(
                this.mapMessageWithProposalsFormToSendCommand()
            )
            .subscribe(
                (response: any) => {
                    this.dates = [];
                    this.events.emit(MessageEvents.SentOK);
                },
                (error: any) => {
                    this.events.emit(MessageEvents.SentButError);
                },
                () => {}
            );
    }
    public sendSimpleMessage(): void {
        this.messagingProvider
            .sendMessage(this.mapMessageFormToSendCommand())
            .subscribe(
                (response: any) => {
                    this.events.emit(MessageEvents.SentOK);
                },
                (error: any) => {
                    this.events.emit(MessageEvents.SentButError);
                },
                () => {}
            );
    }

    public handleModalClose(): void {
        this.events.emit(MessageEvents.NotSent);
    }

    public emitterIsReceiver(): boolean {
        return this.accountService.isUserIdAccount(this.options?.userId);
    }
    public updateProposalDates(event): void {
        this.dates = event;
    }
    private setMessageForm(): void {
        this.messageForm = new FormGroup({
            message: new FormControl('', [
                Validators.required,
                Validators.maxLength(CONFIG.restrictions.messages.maxLength),
            ]),
        });

        this.messageForm.setValue({
            message: '',
        });
    }

    private mapMessageFormToSendCommand(): SendMessageCommand {
        const account: Account | null = this.accountService.get();
        const messageWithClickableUrl = this.transformToClickableUrl(
            this.messageForm.value.message
        );

        return new SendMessageCommand(
            !R.isNil(this.options.conversationId)
                ? this.options.conversationId
                : null,
            !R.isNil(account) ? account.id : '',
            this.options.userId,
            messageWithClickableUrl
        );
    }
    private mapMessageWithProposalsFormToSendCommand(): SendMessageWithProposalsCommand {
        const account: Account | null = this.accountService.get();
        const messageWithClickableUrl = this.transformToClickableUrl(
            this.messageForm.value.message
        );

        return new SendMessageWithProposalsCommand(
            !R.isNil(this.options.conversationId)
                ? this.options.conversationId
                : null,
            !R.isNil(account) ? account.id : '',
            this.options.userId,
            messageWithClickableUrl,
            this.dates
        );
    }

    private transformToClickableUrl(msg: string): string {
        const options: NgxLinkifyOptions = {
            defaultProtocol: 'https',
            target: {
                url: '_blank',
            },
            validate: true,
        };

        return this.linkifyService.linkify(msg, options);
    }
}
