import { JobUser } from '../../jobs/models/job-user.model';
import { CompanyPromote } from '../../promotions/models/company-promote.model';
import { User } from '../../users/models/user.model';

export class SearchResultRestricted {
    public readonly user: User;
    public readonly job: JobUser;
    public readonly relevance: number;
    public readonly promote: CompanyPromote;
}
