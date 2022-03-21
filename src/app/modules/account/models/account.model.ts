import * as moment from 'moment';
import * as R from 'ramda';
import { JobUser } from '../../jobs/models/job-user.model';
import { User } from '../../users/models/user.model';
import { UserAddress } from './../../users/models/user-address.model';
import { AccountConversation } from './account-conversation.model';
import { AccountFavorite } from './account-favorite.model';

export class Account {
    public readonly id: string;
    public readonly photoUrl: string|null;
    public readonly email: string;
    public readonly phone: string|null;
    public readonly address: UserAddress;
    public readonly user: User;
    public readonly jobs: Array<JobUser>;
    public readonly favorites: Array<AccountFavorite>;
    public readonly conversations: Array<AccountConversation>;
    public readonly hasAlreadyBeenUpdated: boolean;

    public constructor (
        id: string,
        photoUrl: string|null,
        email: string,
        phone: string|null,
        address: UserAddress,
        user: User,
        jobs: Array<JobUser>,
        favorites: Array<AccountFavorite>,
        conversations: Array<AccountConversation>,
        hasAlreadyBeenUpdated: boolean
    ) {
        this.id = id;
        this.photoUrl = photoUrl;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.user = user;
        this.jobs = jobs;
        this.favorites = favorites;
        this.conversations = conversations;
        this.hasAlreadyBeenUpdated = hasAlreadyBeenUpdated;
    }

    public static construct(
        account: Account
    ): Account {
        return new Account(
            account.id,
            account.photoUrl,
            account.email,
            account.phone,
            account.address,
            account.user,
            account.jobs,
            account.favorites,
            R.sortBy(
                R.prop('updatedOn') as any,
                account.conversations.map(
                    AccountConversation.construct
                )
            ).reverse(),
            account.hasAlreadyBeenUpdated
        );
    }

    public isProfessional(): boolean {
        return !R.isNil(this.user)
            && !R.isNil(this.user.isProfessional)
            && this.user.isProfessional === true;
    }

    public isMinor(): boolean {
        if (!R.isNil(this.user?.birthDate)) {
            const ageMajority = 18;

            const userAge = parseInt(moment().diff(
                this.user.birthDate,
                'years',
                true
            )?.toString(), 10);

            const isMinor = userAge < ageMajority;

            return isMinor;
        }

        return false;
    }

    public isJobUserInFavorites(
        jobUserId: string
    ): boolean {
        return this.favorites.find(
            (favorite: AccountFavorite) => R.equals(
                favorite.jobUserId,
                jobUserId
            )
        ) !== undefined;
    }

    public numberOfTimesUserIsInFavorites(
        userId: string
    ): number {
        return !R.isNil(userId)
            ? this.favorites.filter(
                (accountFavorite: AccountFavorite) => R.equals(
                    accountFavorite.userId,
                    userId
                )
            ).length
            : 0;
    }

    public getFavorite(
        userId: string,
        jobUserId: string
    ): AccountFavorite|null {
        const favorite: AccountFavorite|undefined = this.favorites.find(
            (accountFavorite: AccountFavorite) => R.equals(
                accountFavorite.userId,
                userId
            ) && R.equals(
                accountFavorite.jobUserId,
                jobUserId
            )
        );

        return !R.isNil(favorite)
            ? favorite
            : null;
    }

    public getFavoriteByUserId(
        userId: string
    ): AccountFavorite|null   {
        const favorite: AccountFavorite|undefined = this.favorites.find(
            (accountFavorite: AccountFavorite) => R.equals(
                accountFavorite.userId,
                userId
            )
        );

        return !R.isNil(favorite)
            ? favorite
            : null;
    }
}
