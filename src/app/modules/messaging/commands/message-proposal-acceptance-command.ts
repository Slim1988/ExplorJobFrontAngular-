import { ProposalStatus } from '../../account/models/proposalStatus';
import { SendMessageWithProposalsCommand } from './send-message-poposals.command';

export class MessageProposalAcceptanceCommand {
    public readonly id: string;
    public readonly ownerId: string;
    public readonly proposalId: string;
    public readonly proposalStatus: ProposalStatus;
    public readonly messageCommand: SendMessageWithProposalsCommand;

    public constructor (
        id: string,
        ownerId: string,
        proposalId: string,
        proposalStatus: ProposalStatus,
        messageCommand: SendMessageWithProposalsCommand
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.proposalId = proposalId;
        this.proposalStatus = proposalStatus;
        this.messageCommand = messageCommand;
    }
}
