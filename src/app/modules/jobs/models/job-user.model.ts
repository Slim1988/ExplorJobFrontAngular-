import { JobDomain } from './job-domain.model';

export class JobUser {
    public readonly id: string;
    public readonly domains: Array<JobDomain>;
    public readonly label: string;
    public readonly company: string;
    public readonly presentation: string;
    public readonly userId: string;

    public static New(
        userId: string
    ): JobUser {
        return {
            id: null,
            domains: [],
            label: null,
            company: null,
            presentation: null,
            userId: userId
        } as JobUser;
    }
}
