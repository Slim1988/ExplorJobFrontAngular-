export class UserMeetingCreateCommand {
    public readonly instigatorId: string;
    public readonly userId: string;
    public readonly met: boolean;


    public constructor(
        instigatorId: string,
        userId: string,
        met: boolean
    ) {
        this.instigatorId = instigatorId;
        this.userId = userId;
        this.met = met;
    }
}
