export class UserFavoriteCreateCommand {
    public readonly ownerId: string;
    public readonly userId: string;
    public readonly jobUserId: string|null;

    public constructor (
        ownerId: string,
        userId: string,
        jobUserId: string|null
    ) {
        this.ownerId = ownerId;
        this.userId = userId;
        this.jobUserId = jobUserId;
    }
}
