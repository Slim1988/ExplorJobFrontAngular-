import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { AccountIsProfessionalCommand } from '../../commands/account-is-professional.command';
import { AccountMenu } from '../../models/account-menu.model';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { ParentComponent } from './../../../../infrastructure/components/parent.component';
import { Account } from './../../models/account.model';

@Component({
    selector: 'account-become-professional',
    templateUrl: './account-become-professional.component.html',
    styleUrls: [
        './account-become-professional.component.css'
    ]
})
export class AccountBecomeProfessionalComponent extends ParentComponent implements OnInit {
    public constructor(
        private readonly accountService: AccountService,
        private readonly accountProvider: AccountProvider,
        private readonly router: Router
    ) {
        super();
    }

    public ngOnInit(): void { }

    public becomeProfessional(): void {
        const account: Account|null = this.accountService.get();

        if (!R.isNil(account)
        && !account.isProfessional()) {
            this.accountProvider.isProfessional(
                this.isProfessionalCommand(
                    account
                )
            ).subscribe(
                (response: any) => {},
                (error: any) => {},
                () => {
                    this.accountService.getAsync().then(() => {
                        setTimeout(
                            () => window.location.reload(), 450
                        );

                        this.router.navigateByUrl(
                            `/account/${ AccountMenu.AccountJobs }`
                        );
                    });
                }
            );
        }
    }

    private isProfessionalCommand(
        account: Account
    ): AccountIsProfessionalCommand {
        return new AccountIsProfessionalCommand(
            account.id
        );
    }
}
