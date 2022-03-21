import * as R from 'ramda';

export abstract class AccountMenu {
    public static readonly AccountProfileGeneralInformations: string = `account-profile-general-informations`;
    public static readonly AccountProfileContactInformations: string = `account-profile-contact-informations`;
    public static readonly AccountProfileSituationInformations: string = `account-profile-situation-informations`;
    public static readonly AccountMessaging: string = `account-messaging`;
    public static readonly AccountAppointments: string = `account-appointments`;
    public static readonly AccountFavorites: string = `account-favorites`;
    public static readonly AccountJobs: string = `account-jobs`;
    public static readonly AccountChangePassword: string = `account-change-password`;
    public static readonly AccountBecomeProfessional: string = `account-become-professional`;

    public static isItemValid(
        item: string
    ): boolean {
        return Object.values(AccountMenu).find(
            (accountMenuItem) => R.equals(
                accountMenuItem,
                item
            )
        ) !== undefined;
    }
}
