import * as moment from 'moment';
export class SendMessageWithProposalsCommand {
    public readonly conversationId: string;
    public readonly emitterId: string;
    public readonly receiverId: string;
    public readonly content: string;
    public readonly dateTimeList: Date[] ;

    public constructor(
        conversationId: string,
        emitterId: string,
        receiverId: string,
        content: string,
        dateTimeList: moment.Moment[]
    ) {
        this.conversationId = conversationId;
        this.emitterId = emitterId;
        this.receiverId = receiverId;
        this.content = content;
        this.dateTimeList = [];
        if (dateTimeList != null && dateTimeList.length > 0) {
            dateTimeList.forEach(d => this.dateTimeList.push(d.toDate()));
        }
    }
}
