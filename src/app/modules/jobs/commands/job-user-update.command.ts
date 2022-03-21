export class JobUserUpdateCommand {
    public readonly id: string;
    public readonly domainIds: Array<string>;
    public readonly label: string;
    public readonly company: string;
    public readonly presentation: string;
    public readonly userId: string;

    public constructor(
        id: string,
        domainIds: Array<string>,
        label: string,
        company: string,
        presentation: string,
        userId: string
    ) {
        this.id = id;
        this.domainIds  = domainIds;
        this.label  = label;
        this.company = company;
        this.presentation = presentation;
        this.userId  = userId;
    }
}
