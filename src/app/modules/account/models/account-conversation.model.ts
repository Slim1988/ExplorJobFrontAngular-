import * as R from 'ramda';
import { User } from '../../users/models/user.model';
import { AccountMessage } from './account-message.model';

export class AccountConversation {
    public readonly id: string;
    public readonly ownerId: string;
    public readonly interlocutorId: string;
    public readonly interlocutor: User;
    public readonly met: boolean;
    public readonly messages: Array<AccountMessage>;
    public readonly proposals: Array<AccountMessage>;
    public readonly updatedOn: Date;
    public readonly display: boolean;

    public constructor (
        id: string,
        ownerId: string,
        interlocutorId: string,
        interlocutor: User,
        met: boolean,
        messages: Array<AccountMessage>,
        proposals: Array<AccountMessage>,
        updatedOn: Date,
        display: boolean
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.interlocutorId = interlocutorId;
        this.interlocutor = interlocutor;
        this.met = met;
        this.messages = messages;
        this.proposals = proposals;
        this.updatedOn = updatedOn;
        this.display = display;
    }

    public static construct(
        conversation: AccountConversation
    ): AccountConversation {
        return new AccountConversation(
            conversation.id,
            conversation.ownerId,
            conversation.interlocutorId,
            conversation.interlocutor,
            conversation.met,
            R.sortBy(
                R.prop('date') as any,
                conversation.messages
            ),
            conversation.proposals,
            conversation.updatedOn,
            conversation.display
        );
    }

    public numberOfUnreadMessages(): number {
        return this.messages.filter(
            (message: AccountMessage) => !message.read
        ).length;
    }
}
