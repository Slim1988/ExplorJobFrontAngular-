import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from './../../../../infrastructure/components/parent.component';
import { SearchResultRestricted } from './../../models/search-result-restricted.model';

@Component({
    selector: 'search-result-restricted',
    templateUrl: './search-result-restricted.component.html',
    styleUrls: [
        './search-result-restricted.component.css'
    ]
})
export class SearchResultRestrictedComponent extends ParentComponent implements OnInit {
    @Input()
    public result: SearchResultRestricted;

    public constructor(
        private readonly router: Router
    ) {
        super();
    }

    public ngOnInit(): void { }

    public goToCompanyPage(slug: string) {
        this.router.navigateByUrl(`company/${ slug }`);
    }

    public userPhotoDefault(): string {
        return CONFIG.explorJob.users.photo.default;
    }
}
