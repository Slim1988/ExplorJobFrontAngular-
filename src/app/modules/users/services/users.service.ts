import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { AccountFavorite } from '../../account/models/account-favorite.model';
import { UserPublic } from '../models/user-public.model';
import { User } from '../models/user.model';
import { Account } from './../../account/models/account.model';
import { JobUser } from './../../jobs/models/job-user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public constructor() { }

    public isUserPublic(
        user: User|UserPublic|null
    ): boolean {
        return !R.isNil(user)
            && !user.hasOwnProperty('isProfessional');
    }

    public isUserExplorer(
        user: User|UserPublic|null
    ): boolean {
        return !R.isNil(user)
            && user.hasOwnProperty('isProfessional')
            && !(user as User).isProfessional;
    }

    public isUserProfessional(
        user: User|UserPublic|null
    ): boolean {
        return !R.isNil(user)
            && user.hasOwnProperty('isProfessional')
            && (user as User).isProfessional;
    }

    public userTitle(
        user: User|UserPublic|null,
        job: JobUser|null = null,
        jobs: Array<JobUser> = null,
        account: Account|null = null
    ): string {
        const defaultLabel: string = '';
        if (R.isNil(user)) {
            return defaultLabel;
        }
        else if (this.isUserExplorer(user)) {
            return !R.isNil((user as User).professionalSituation)
                ? (user as User).professionalSituation.label
                : defaultLabel;
        }
        else if (!R.isNil(job)) {
            return !R.isNil(job.label)
                ? job.label
                : defaultLabel;
        }
        else if (jobs?.length === 1) {
            return jobs[0].label;
        }
        else if (!R.isNil(account)) {
            const numberOfTimesUserIsInFavorites: number = account.numberOfTimesUserIsInFavorites(
                user.id
            );

            if (numberOfTimesUserIsInFavorites === 1) {
                const favorite: AccountFavorite|null = account.getFavoriteByUserId(
                    user.id
                );

                return this.userTitle(
                    user,
                    favorite.jobUser,
                    jobs,
                    account
                );
            }
            else if (numberOfTimesUserIsInFavorites > 1) {
                return `${ numberOfTimesUserIsInFavorites } métiers en favoris`;
            }
        }

        if (!R.isNil(jobs)) {
            const allJobs: Array<JobUser> = jobs;

            if (!R.isNil(job)
                && !R.contains(job, jobs)
            ) {
                allJobs.push(job);
            }

            return allJobs.length > 0
                ? `${ allJobs.length } métier${ allJobs.length > 1 ? 's' : '' }`
                : defaultLabel;
        }
        else {
            return defaultLabel;
        }
    }
}
