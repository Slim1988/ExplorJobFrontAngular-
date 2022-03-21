import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from './../../../../infrastructure/components/parent.component';
import { SearchResultPublic } from './../../models/search-result-public.model';

@Component({
    selector: 'search-result-public',
    templateUrl: './search-result-public.component.html',
    styleUrls: [
        './search-result-public.component.css'
    ]
})
export class SearchResultPublicComponent extends ParentComponent implements OnInit {
    @Input()
    public result: SearchResultPublic;

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
