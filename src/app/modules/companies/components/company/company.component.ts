import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { SearchQuery } from '../../../search/queries/search.query';
import { SearchService } from '../../../search/services/search.service';
import { Company } from '../../models/company.model';
import { CompaniesProvider } from '../../providers/companies.provider';

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: [
        './company.component.css'
    ]
})
export class CompanyComponent extends ParentComponent implements OnInit {
    public company: Company | null = null;
    public companySlug: string = this.route.snapshot.paramMap.get('slug');
    public mapOptions: any;
    public slideIndex: number = 0;
    public slidePhotos: Array<string> = [];
    public safeGoogleMapsUrl: SafeResourceUrl;
    public safeYoutubeURL: SafeResourceUrl;
    public youtubeReplacementPhoto: string;
    public modalIsShown: boolean = false;
    public modalImageUrl: string;
    public jobUsersAllCompanies: Array<string> = [];

    public constructor(
        private readonly companiesProvider: CompaniesProvider,
        private readonly jobUsersProvider: JobUsersProvider,
        private readonly router: Router,
        private readonly searchService: SearchService,
        private readonly route: ActivatedRoute,
        private readonly sanitizer: DomSanitizer
    ) {
        super();
    }

    public ngOnInit(): void {
        this.getJobUsersCompanies();
    }

    public isLoaded(): boolean {
        return this.company != null;
    }

    public setSlide(
        n: number
    ) {
        this.slideIndex = n;
        const numberOfSlides = this.slidePhotos.length;

        if (n > numberOfSlides - 1) {
            this.slideIndex = 0;
        }

        if (n < 0) {
            this.slideIndex = numberOfSlides - 1;
        }
    }

    public handleModalOpen(url: string) {
        this.modalIsShown = true;
        this.modalImageUrl = url;
    }

    public handleModalClose() {
        this.modalIsShown = false;
    }

    private setSlidePhotos() {
        this.slidePhotos = this.company.medias.photoUrls.map((url: string) => url);
        this.slidePhotos.filter((url: string) => url.length < 1);

        if (!R.isNil(this.company.medias.youtubeVideoEmbedUrl) && !R.isEmpty(this.company.medias.youtubeVideoEmbedUrl)) {
            this.safeYoutubeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.company.medias.youtubeVideoEmbedUrl);
        }
        else {
            const randomIndex = Math.floor(Math.random() * this.company.medias.photoUrls.length);
            this.slidePhotos.splice(randomIndex, 1);
            this.youtubeReplacementPhoto = this.company.medias.photoUrls[randomIndex];
        }
    }

    private setGoogleMapsUrl() {
        this.safeGoogleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.company.coordinates.mapEmbedUrl
        );
    }

    private setSearchQuery() {
        const company: string|undefined = this.jobUsersAllCompanies.find(
            (jobUsersAllCompany: string) => R.equals(
                jobUsersAllCompany.toLowerCase(),
                this.company.name.toLowerCase()
            )
        );

        const searchQuery = new SearchQuery(
            '',
            '',
            [],
            !R.isNil(company)
                ? company
                : this.company.name,
            undefined,
            ''
        );

        if (!R.isNil(searchQuery)) {
            this.searchService.setQuery(
                searchQuery
            );
        }
    }

    private getCompany(): void {
        this.companiesProvider.getOneBySlug(
            this.companySlug
        ).subscribe(
            (company: Company) => {
                this.company = company;
                this.setSlidePhotos();
                this.setGoogleMapsUrl();
                this.setSlide(0);
                this.setSearchQuery();
            },
            (error: any) => this.router.navigateByUrl('/search/request'),
            () => {}
        );
    }

    private getJobUsersCompanies(): void {
        this.jobUsersProvider.getAllCompanies().subscribe(
            (companies: Array<string>) => {
                this.jobUsersAllCompanies = companies
                    .map(
                        (company: string) => !R.isNil(company) &&
                            company.charAt(0).toUpperCase().concat(company.slice(1))
                    )
                    .filter(
                        (company: string) => typeof company === 'string'
                    );
            },
            () => null,
            () => this.getCompany()
        );
    }
}
