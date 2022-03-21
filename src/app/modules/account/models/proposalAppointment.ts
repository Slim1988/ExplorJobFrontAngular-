import { AccountMessage } from './account-message.model';
import { ProposalStatus } from './proposalStatus';

export class ProposalAppointment {
    public readonly id: string;
    public dateTime: Date;
    public readonly proposalStaus: ProposalStatus;
    public readonly messageProposal: AccountMessage;
    public readonly fromInterlocutor: boolean;
    public readonly reviewed: boolean;
}
