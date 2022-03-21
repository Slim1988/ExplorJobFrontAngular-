import { User } from '../../users/models/user.model';
import { JobUser } from './../../jobs/models/job-user.model';

export class AccountFavorite {
    public readonly id: string;
    public readonly ownerId: string;
    public readonly userId: string;
    public readonly user: User;
    public readonly jobUserId: string|null;
    public readonly jobUser: JobUser|null;
    public readonly met: boolean;
}
