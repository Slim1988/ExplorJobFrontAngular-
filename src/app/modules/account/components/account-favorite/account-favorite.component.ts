import { Component, Input, OnInit } from '@angular/core';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AccountFavorite } from './../../models/account-favorite.model';

@Component({
    selector: 'account-favorite',
    templateUrl: './account-favorite.component.html',
    styleUrls: [
        './account-favorite.component.css'
    ]
})
export class AccountFavoriteComponent extends ParentComponent implements OnInit {
    @Input()
    public favorite: AccountFavorite;

    public constructor() {
        super();
    }

    public ngOnInit(): void { }

    public userPhotoDefault(): string {
        return CONFIG.explorJob.users.photo.default;
    }
}
