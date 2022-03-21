import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as R from 'ramda';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AccountMenu } from '../../models/account-menu.model';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: [
        './account.component.css'
    ]
})
export class AccountComponent extends ParentComponent implements OnInit {
    public menuItemSelectedDefault: string = AccountMenu.AccountProfileGeneralInformations;
    public menuItemSelected: string;
    public numberOfUnreadMessage: number;
    public loaded: boolean = false;

    public constructor(
        private readonly accountService: AccountService,
        private readonly route: ActivatedRoute,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.setMenuItemSelected(
            this.route.snapshot.paramMap.get('menu')
        );

        this.accountService.reload();

        if (!R.isNil(
            this.accountService.getAsync()
        )) {
            this.loaded = true;
        }
    }

    public setMenuItemSelected(
        menuItemSelected: string = null
    ): void {
        this.menuItemSelected = !R.isNil(menuItemSelected)
            && AccountMenu.isItemValid(menuItemSelected)
            ? menuItemSelected
            : this.menuItemSelectedDefault;
    }

    public onNumberOfUnreadMessageUpdated(numberOfUnreadMessage: number) {
        this.numberOfUnreadMessage = numberOfUnreadMessage;
    }
}
