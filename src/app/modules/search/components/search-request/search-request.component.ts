import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng';
import * as R from 'ramda';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AtLeastOneInFormValidator } from '../../../../infrastructure/validators/at-least-one-in-form.validator';
import { JobDomain } from '../../../jobs/models/job-domain.model';
import { JobDomainsProvider } from '../../../jobs/providers/job-domains.provider';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { CompanyPromote } from '../../../promotions/models/company-promote.model';
import { PromotionsProvider } from '../../../promotions/providers/promotions.provider';
import { SearchQuery } from '../../queries/search.query';
import { SearchService } from '../../services/search.service';
import { Agglomeration } from './../../../agglomerations/models/agglomeration';
import { AgglomerationsProvider } from './../../../agglomerations/providers/agglomerations.provider';

@Component({
    selector: 'search-request',
    templateUrl: './search-request.component.html',
    styleUrls: [
        './search-request.component.css'
    ]
})
export class SearchRequestComponent extends ParentComponent implements OnInit, DoCheck {
    public searchForm: FormGroup;

    public jobDomains: Array<JobDomain> = null;
    public agglomerations: Array<Agglomeration>  = new Array<Agglomeration>();
    public jobDomainsDropdown: Array<SelectItem> = [];
    public jobDomainsDropdownSelected: Array<SelectItem> = [];
    public parameterLocalisationValue: string;
    public companiesToPromote: Array<CompanyPromote> = [];

    public jobUsersAllCompanies: Array<string> = [];
    public jobUsersFilteredCompanies: Array<string> = [];

    public constructor(
        private readonly searchService: SearchService,
        private readonly jobUsersProvider: JobUsersProvider,
        private readonly jobDomainsProvider: JobDomainsProvider,
        private readonly agglomerationsProvider: AgglomerationsProvider,
        private readonly promotionsProvider: PromotionsProvider,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
        super();
        this.setSearchForm();
    }

    public ngOnInit(): void {
        this.getAgglomerations();
        this.getCompaniesToPromote();
    }

    public ngDoCheck(): void {
        if (R.isNil(this.jobDomains)) {
            this.load();
        }
    }

    public search(): void {
        if (this.searchForm.valid) {
            this.searchService.setQuery(
                this.mapSearchFormToQuery()
            );

            this.router.navigateByUrl('/search/results');
        }
    }

    public localisationInputChange(): void {
        this.searchService.clearLocalisationSearchField();
    }

    public searchCompanies(event: any) {
        this.jobUsersFilteredCompanies = this.jobUsersAllCompanies
            .filter(
                (company: string) => company.toLowerCase().includes(
                    String(event.query).toLowerCase()
                )
            )
            .map((company: string) =>
                company.charAt(0).toUpperCase().concat(company.slice(1))
            );
    }

    public onClearCompaniesInput(event: any) {
        this.jobUsersFilteredCompanies = this.jobUsersAllCompanies;
    }

    private setSearchForm(): void {
        this.searchForm = new FormGroup({
            query: new FormControl('', []),
            jobLabel: new FormControl('', []),
            jobDomains: new FormControl('', []),
            company: new FormControl('', []),
            localisation: new FormControl('', []),
            presentation: new FormControl('', [])
        });

        this.searchForm.setValidators(
            Validators.compose([
                AtLeastOneInFormValidator()
            ])
        );
    }

    private initLocalisationField(): void {
        let localisationValue = '';

        if (R.isNil(this.parameterLocalisationValue)
        && this.searchService.hasLocalisationSearchField
        ) {
            localisationValue = this.searchService.getLocalisationSearchField();
        }
        else {
            const paramAgglomeration = this.agglomerations.find(
                (agglomeration: Agglomeration) => R.equals(
                    this.parameterLocalisationValue.toLowerCase(),
                    agglomeration.label.toLowerCase()
                )
            );
            if (!R.isNil(paramAgglomeration)) {
                localisationValue = paramAgglomeration.label;
            }
        }

        this.searchService.setLocalisationSearchField(localisationValue);
        this.searchForm.patchValue(
            {
                localisation: localisationValue
            }
        );
    }

    private load(): void {
        this.getJobUsersCompanies();
        this.getJobDomains();
    }

    private mapSearchFormToQuery(): SearchQuery {
        return new SearchQuery(
            this.searchForm.value.query,
            this.searchForm.value.jobLabel,
            this.jobDomainsDropdownSelected.map(
                (item: SelectItem) => item.value
            ),
            this.searchForm.value.company,
            this.searchForm.value.localisation,
            this.searchForm.value.presentation
        );
    }

    private getJobDomains(): void {
        this.jobDomainsProvider.getAll().subscribe(
            (jobDomains: Array<JobDomain>) => this.jobDomains = jobDomains,
            (error: any) => null,
            () => {
                this.jobDomainsDropdown = [];

                this.jobDomains.map(
                    (jobDomain: JobDomain) => this.jobDomainsDropdown.push({
                        label: jobDomain.label,
                        value: jobDomain.id
                    } as SelectItem)
                );
            }
        );
    }

    private getAgglomerations(): void {
        this.agglomerationsProvider.getAll().subscribe(
            (agglomeration: Array<Agglomeration>) => this.agglomerations = agglomeration,
            (error: any) => null,
            () => {
                this.route.paramMap.subscribe(
                    (param: any) => {
                        this.parameterLocalisationValue = param.get('localisation');
                        this.initLocalisationField();
                    },
                    (error: any) => null
                );
            }
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
            () => {},
        );
    }

    private async getCompaniesToPromote(): Promise<void> {
        await this.promotionsProvider.getAllPromotesForSearchForm().subscribe(
            (promotes: Array<CompanyPromote>) => {
                this.companiesToPromote = promotes;
            },
            (error: any) => { },
            () => { }
        );
    }

}
