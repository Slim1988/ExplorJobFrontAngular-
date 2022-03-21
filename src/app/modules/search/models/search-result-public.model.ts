import { JobUser } from '../../jobs/models/job-user.model';
import { CompanyPromote } from '../../promotions/models/company-promote.model';
import { UserPublic } from './../../users/models/user-public.model';

export class SearchResultPublic {
    public readonly user: UserPublic;
    public readonly job: JobUser;
    public readonly relevance: number;
    public readonly promote: CompanyPromote;
}
