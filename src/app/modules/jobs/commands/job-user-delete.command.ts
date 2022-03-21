export class JobUserDeleteCommand {
    public readonly id: string;
    public readonly userId: string;

    public constructor(
        id: string,
        userId: string
    ) {
        this.id = id;
        this.userId  = userId;
    }
}
