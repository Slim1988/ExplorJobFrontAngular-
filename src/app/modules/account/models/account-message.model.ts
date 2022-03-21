import { ProposalAppointment } from './proposalAppointment';

export class AccountMessage {
    public readonly id: string;
    public readonly commonId: string;
    public readonly fromOwner: boolean;
    public readonly fromInterlocutor: boolean;
    public readonly content: string;
    public readonly read: boolean;
    public readonly date: Date;
    public readonly proposalAppointments: Array<ProposalAppointment>;
    public readonly emitterId: string;
    public readonly receiverId: string;
}
