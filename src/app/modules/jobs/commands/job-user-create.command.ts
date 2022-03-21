export class JobUserCreateCommand {
    public readonly domainIds: Array<string>;
    public readonly label:  string;
    public readonly company: string;
    public readonly presentation: string;
    public readonly userId: string;

    public constructor(
        domainIds: Array<string>,
        label:  string,
        company: string,
        presentation: string,
        userId: string
    ) {
        this.domainIds  = domainIds;
        this.label  = label;
        this.company = company;
        this.presentation = presentation;
        this.userId  = userId;
    }
}
