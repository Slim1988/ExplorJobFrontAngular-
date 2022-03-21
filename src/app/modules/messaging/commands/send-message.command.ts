export class SendMessageCommand {
    public readonly conversationId: string;
    public readonly emitterId: string;
    public readonly receiverId: string;
    public readonly content: string;

    public constructor(
        conversationId: string,
        emitterId: string,
        receiverId: string,
        content: string
    ) {
        this.conversationId = conversationId;
        this.emitterId = emitterId;
        this.receiverId = receiverId;
        this.content = content;
    }
}
