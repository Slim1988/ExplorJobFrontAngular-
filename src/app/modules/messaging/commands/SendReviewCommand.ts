import { IsExplorerGood } from '../../account/models/isExplorerGood';
import { MeetingCanellationReason } from '../../account/models/meetingCanellationReason';
import { MeetingDuration } from '../../account/models/meetingDuration';
import { MeetingPlateform } from '../../account/models/meetingPlateform';
import { Role } from '../../account/models/role';
import { JobUser } from '../../jobs/models/job-user.model';

export class SendReviewCommand {
    public readonly proposalId: string;
    public readonly emitterId: string;
    public readonly receiverId: string;
    public readonly commonId: string;
    public readonly hasMet: boolean;
    public readonly whatWereYou: Role;
    public readonly whichJob: string;
    public readonly meetingQuality: number;
    public readonly recommendation: number;
    public readonly doTheSame: number;
    public readonly sameCompany: number;
    public readonly isExplorerGood: IsExplorerGood;
    public readonly isExplorerInterestingForCompany;
    public readonly meetingPlateform: MeetingPlateform;
    public readonly meetingDuration: MeetingDuration;
    public readonly meetingCanellationReason: MeetingCanellationReason;
    public readonly otherComment: string;
    public readonly meetingCanellationReasonOther: string;

    public constructor(
        proposalId: string,
        emitterId: string,
        receiverId: string,
        commonId: string,
        hasMet: boolean,
        whatWereYou: Role,
        whichJob: string,
        meetingQuality: number,
        recommendation: number,
        doTheSame: number,
        sameCompany: number,
        isExplorerGood: IsExplorerGood,
        isExplorerInterestingForCompany: IsExplorerGood,
        meetingPlateform: MeetingPlateform,
        meetingDuration: MeetingDuration,
        meetingCanellationReason: MeetingCanellationReason,
        otherComment: string,
        meetingCanellationReasonOther: string
    ) {
        this.proposalId = proposalId;
        this.emitterId = emitterId;
        this.receiverId = receiverId;
        this.commonId = commonId;
        this.hasMet = hasMet;
        this.whatWereYou = whatWereYou;
        this.whichJob = whichJob;
        this.meetingQuality = meetingQuality;
        this.recommendation = recommendation;
        this.doTheSame = doTheSame;
        this.sameCompany = sameCompany;
        this.isExplorerGood = isExplorerGood;
        this.isExplorerInterestingForCompany = isExplorerInterestingForCompany,
        this.meetingPlateform = meetingPlateform;
        this.meetingDuration = meetingDuration;
        this.meetingCanellationReason = meetingCanellationReason;
        this.otherComment = otherComment;
        this.meetingCanellationReasonOther = meetingCanellationReasonOther;
    }
}
