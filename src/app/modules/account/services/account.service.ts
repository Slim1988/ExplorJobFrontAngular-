import { EventEmitter, Injectable } from '@angular/core';
import * as R from 'ramda';
import { AuthEvents } from '../../auth/events/auth.events';
import { AuthService } from '../../auth/services/auth.service';
import { AccountEvents } from '../events/account.events';
import { AccountProvider } from '../providers/account.provider';
import { CONFIG } from './../../../config/config';
import { Account } from './../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    public readonly events: EventEmitter<string> = new EventEmitter();

    private account: Account = null;

    /**
     * DEPRECATED <behavior>
     * Progressively stop using it as Account store, only as provider
     * Only kept and use method 'fetch(): Promise<Account|null>'
     * Events associated can also been deleted
     */
    public constructor(
        private readonly authService: AuthService,
        private readonly accountProvider: AccountProvider
    ) {
        this.authService.events.subscribe(
            this.authEventsSubscription
        );

        this.accountProvider.events.subscribe(
            this.accountEventsSubscription
        );

        this.refresh();
    }

    public async fetch(): Promise<Account|null> {
        if (this.authService.isLoggedIn()) {
            const userId: string|null = this.authService.getUserId();

            if (!R.isNil(userId)) {
                await this.accountProvider.getByUserId(
                    userId
                ).subscribe(
                    (account: Account) => this.account = Account.construct(
                        account
                    ),
                    (error: any) => { throw error; },
                    () => { }
                );

                return this.account;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    public get(): Account|null {
        return this.account;
    }

    public async getAsync(): Promise<Account|null> {
        if (R.isNil(this.account)) {
            return await this.load();
        }
        else {
            return this.account;
        }
    }

    public isUserIdAccount(
        userId: string
    ): boolean {
        return R.equals(
            this.account?.id,
            userId
        );
    }

    public async reload(): Promise<Account|null> {
        return await this.load();
    }

    private async load(): Promise<Account|null> {
        if (this.authService.isLoggedIn()) {
            const userId: string|null = this.authService.getUserId();

            if (!R.isNil(userId)) {
                this.clear();

                await this.accountProvider.getByUserId(
                    userId
                ).subscribe(
                    (account: Account) => this.account = Account.construct(
                        account
                    ),
                    (error: any) => { throw error; },
                    () => this.events.emit(AccountEvents.IsLoaded)
                );

                return this.account;
            }
            else {
                return null;
            }
        }
        else {
            this.clear();
        }
    }

    private clear(): void {
        this.account = null;
        this.events.emit(AccountEvents.WasUpdated);
    }

    private refresh(): void {
        setInterval(
            () => this.load(),
            CONFIG.account.refresh.interval
        );
    }

    private authEventsSubscription(
        event: any
    ): void {
        switch (event) {
            case AuthEvents.LoggedIn:
                if (!R.isNil(this)) {
                    this.reload();
                }
                break;

            case AuthEvents.LoggedOut:
                if (!R.isNil(this)) {
                    this.clear();
                }
                break;

            default:
                break;
        }
    }

    private accountEventsSubscription(
        event: any
    ): void {
        switch (event) {
            case AccountEvents.WasUpdated:
                if (!R.isNil(this)) {
                    this.reload();
                }
                break;

            case AccountEvents.WasDeleted:
                if (!R.isNil(this)) {
                    this.clear();
                }
                break;

            default:
                break;
        }
    }
}
