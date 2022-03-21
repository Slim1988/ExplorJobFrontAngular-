export class SearchQuery {
    public query: string;
    public jobLabel: string;
    public jobDomainIds: Array<string>;
    public company: string;
    public localisation: string;
    public presentation: string;

    public constructor (
        query: string,
        jobLabel: string,
        jobDomainIds: Array<string>,
        company: string,
        localisation: string,
        presentation: string
    ) {
        this.query = query;
        this.jobLabel = jobLabel;
        this.jobDomainIds = jobDomainIds;
        this.company = company;
        this.localisation = localisation;
        this.presentation = presentation;
    }
}
