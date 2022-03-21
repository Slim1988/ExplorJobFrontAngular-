export class MarkAsUnreadMessageCommand {
    public readonly id: string;
    public readonly ownerId: string;

    public constructor (
        id: string,
        ownerId: string
    ) {
        this.id = id;
        this.ownerId = ownerId;
    }
}
