export class UserReportedCreateCommand {
    public readonly reporterId: string;
    public readonly reportedId: string;
    public readonly reportReason: string;

    public constructor(
        reporterId: string,
        reportedId: string,
        reportReason: string
    ) {
        this.reporterId = reporterId;
        this.reportedId = reportedId;
        this.reportReason = reportReason;
    }
}
